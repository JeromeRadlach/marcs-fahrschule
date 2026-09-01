import { Link } from 'react-router-dom'

function Footer() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/marcs_fahrschule', icon: 'instagram' },
    { name: 'TikTok', url: 'https://tiktok.com/@derfahrlehrermarc', icon: 'tiktok' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/17wEPu5JMk', icon: 'facebook' },
    { name: 'Google Reviews', url: 'https://g.page/r/CcMhcLr2dyyCEAE/review', icon: 'google' },
  ]

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logo & About */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 text-white">
            Marc's Fahrschule
          </h3>
          <p className="text-white opacity-80 mb-2">
            Eure Zukunft beginnt hier! Professionelle Fahrtraining in Essen für alle Klassen.
          </p>
          <p className="text-white opacity-70 text-sm">
            Reuenberg 83, 45357 Essen | Telefon: <a href="tel:+492013194371" className="text-white hover:underline">0201/3194371</a>
          </p>
        </div>

        {/* Legal & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white border-opacity-20 pt-4">
          <div className="mb-4 md:mb-0">
            <p className="text-white text-sm opacity-70">
              &copy; {new Date().getFullYear()} Marc's Fahrschule. Alle Rechte vorbehalten.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon === 'instagram' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.2.5 2.4.1 1.3.1 2.1.1 4.9.1 4.9.1s0 3.6.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-2.1.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.2-.5-2.4.1-1.3.1-2.1.1-4.9s0-3.6-.1-4.9c-.1-1.2-.3-1.9-.5-2.4-.2-.6-.5-1-1-1.5-.5-.5-.9-.8-1.5-1-.5-.2-1.2-.4-2.4-.5-1.3-.1-2.1-.1-4.9-.1s-3.6 0-4.9.1c-1.2.1-1.9.3-2.4.5-.6.2-1 .5-1.5 1-.5.5-.8.9-1 1.5-.2.5-.4 1.2-.5 2.4C2.2 15.6 2.2 12 2.2 8.8s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.2 1.2-.4 2.4-.5 1.3-.1 2.1-.1 4.9-.1s3.6 0 4.9.1c1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.2.5 2.4.1 1.3.1 2.1.1 4.9.1s0 3.6.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-2.1.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.2-.5-2.4.1-1.3.1-2.1.1-4.9s0-3.6-.1-4.9c-.1-1.2-.3-1.9-.5-2.4-.2-.6-.5-1-1-1.5-.5-.5-.9-.8-1.5-1-.5-.2-1.2-.4-2.4-.5-1.3-.1-2.1-.1-4.9-.1s-3.6 0-4.9.1c-1.2.1-1.9.3-2.4.5-.6.2-1 .5-1.5 1-.5.5-.8.9-1 1.5-.2.5-.4 1.2-.5 2.4C2.2 15.6 2.2 12 2.2 8.8s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.2 1.2-.4 2.4-.5 1.3-.1 2.1-.1 4.9-.1z" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.236.195 2.236.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  )}
                  {social.icon === 'tiktok' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.313 0 2.595.147 3.877.443a5.96 5.96 0 0 1 2.366 1.315 5.96 5.96 0 0 1 1.506 1.678c.266.976.266 2.04.266 3.144v3.02a10.45 10.45 0 0 1-2.085.625 10.4 10.4 0 0 1-4.22-.415 10.43 10.43 0 0 1-3.04-1.863 10.44 10.44 0 0 1-.98-2.287 10.44 10.44 0 0 1 .37-1.267 9.263 9.263 0 0 1-2.834-5.916 9.24 9.24 0 0 1 .525-3.588 9.76 9.76 0 0 1.51-2.31 1.168a10.44 10.44 0 0 1 3.39-.376V9.76a5.95 5.95 0 0 0-.985-.042 5.95 5.95 0 0 0-4.41 2.35 5.95 5.95 0 0 0-.63 2.84 5.95 5.95 0 0 0 .465 2.51 5.95 5.95 0 0 0 2.83.465 5.95 5.95 0 0 0 2.51-.465 5.95 5.95 0 0 0 1.49-1.86 5.95 5.95 0 0 0 .56-2.84V6.993c0-.285-.065-.565-.187-.815a5.95 5.95 0 0 0-.828-.625 5.95 5.95 0 0 0-1.85-.365c-.54-.015-1.078.015-1.615.087a10.45 10.45 0 0 0-4.64 1.72a10.43 10.43 0 0 0-3.46 3.11 10.43 10.43 0 0 0-1.62 3.41 10.43 10.43 0 0 0 .087 4.64 10.43 10.43 0 0 0 1.72 4.64 10.43 10.43 0 0 0 3.11 3.46 10.43 10.43 0 0 0 3.41 1.62 10.43 10.43 0 0 0 1.83 0 10.43 10.43 0 0 0 1.8-.34 10.43 10.43 0 0 0 1.29-.82 10.43 10.43 0 0 0 .82-1.29 10.43 10.43 0 0 0-.82-1.62V12.72a5.95 5.95 0 0 0-.545-1.88 5.95 5.95 0 0 0-1.85-.83V6.993" />
                    </svg>
                  )}
                  {social.icon === 'google' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.24 10.99v3.24h4.92c-.2 2.34-2.1 3.56-4.92 3.56a5.62 5.62 0 0 1-5.6-5.6 5.62 5.62 0 0 1 5.6-5.6c1.56 0 2.64.66 3.36 1.24l2.4-2.4a9.24 9.24 0 0 0-6.74-2.4 9.24 9.24 0 0 0-9.24 9.24C2.4 18.28 6.06 21.6 12 21.6a9.12 9.12 0 0 0 7.23-3.44 9.12 9.12 0 0 0 1.21-4.46h-8.44v3.24h.12" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
            
            <div className="flex space-x-4 text-sm">
              <Link to="/impressum" className="text-white opacity-70 hover:opacity-100 transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="text-white opacity-70 hover:opacity-100 transition-colors">Datenschutz</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer