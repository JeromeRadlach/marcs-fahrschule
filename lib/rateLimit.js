// Shared rate limiting for the Express server (server.js) and the
// serverless contact handler (api/contact.js), so both honour the same
// RATE_LIMIT_WINDOW_MS / RATE_LIMIT_MAX configuration.

const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const DEFAULT_RATE_LIMIT_MAX = 5

// Tracked IPs are pruned once the map grows past this, so a long-lived
// warm instance cannot accumulate entries indefinitely
const MAX_TRACKED_KEYS = 10000

// Reads a positive integer from the environment, falling back when unset or invalid
function readPositiveInt(name, fallback) {
  const raw = process.env[name]
  if (raw === undefined || raw.trim() === '') return fallback

  const value = Number(raw)
  if (!Number.isInteger(value) || value <= 0) {
    console.warn('[CONFIG] Ignoring invalid ' + name + '="' + raw + '", using default ' + fallback)
    return fallback
  }
  return value
}

// Read lazily rather than at module load: server.js calls dotenv.config() only
// after its imports have been evaluated, so reading process.env here at import
// time would miss everything defined in .env
export function getRateLimitConfig() {
  return {
    windowMs: readPositiveInt('RATE_LIMIT_WINDOW_MS', DEFAULT_RATE_LIMIT_WINDOW_MS),
    max: readPositiveInt('RATE_LIMIT_MAX', DEFAULT_RATE_LIMIT_MAX)
  }
}

// Serverless requests have no req.ip - the client address arrives in the
// proxy headers set by the platform
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded

  if (typeof firstForwarded === 'string' && firstForwarded.trim() !== '') {
    return firstForwarded.split(',')[0].trim()
  }

  const realIp = req.headers['x-real-ip']
  if (typeof realIp === 'string' && realIp.trim() !== '') return realIp.trim()

  return req.socket?.remoteAddress || 'unknown'
}

// Fixed-window counters held in module scope.
// NOTE: serverless instances do not share memory, so this caps requests per
// warm instance rather than globally. It blunts casual abuse and accidental
// double submits; a shared store (Redis) is required for a hard global cap.
const hits = new Map()

function pruneExpired(now) {
  for (const [key, entry] of hits) {
    if (now >= entry.resetAt) hits.delete(key)
  }
}

export function checkRateLimit(key, { windowMs, max }, now = Date.now()) {
  const entry = hits.get(key)

  if (!entry || now >= entry.resetAt) {
    if (hits.size >= MAX_TRACKED_KEYS) pruneExpired(now)
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: max - 1, retryAfterSeconds: 0 }
  }

  entry.count += 1

  if (entry.count > max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
    }
  }

  return { allowed: true, remaining: max - entry.count, retryAfterSeconds: 0 }
}

// Exposed for tests and for resetting state between runs
export function resetRateLimitState() {
  hits.clear()
}
