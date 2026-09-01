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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.236.195 2.236.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  )}
                  {social.icon === 'tiktok' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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