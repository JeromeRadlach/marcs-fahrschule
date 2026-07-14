import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Start', path: '/' },
    { name: 'Fahrzeuge', path: '/fahrzeuge' },
    { name: 'Team', path: '/team' },
    { name: 'Aufbauseminar', path: '/aufbauseminar' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/kontakt' },
  ]

  return (
    <header className="bg-gradient-to-r from-primary to-primary-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Marc's Fahrschule
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-white hover:text-gray-200 transition-colors font-medium ${
                    isActive ? 'border-b-2 border-white' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block text-white hover:text-gray-200 transition-colors font-medium ${
                    isActive ? 'border-b-2 border-white' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header