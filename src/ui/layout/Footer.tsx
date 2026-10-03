import { Icon } from '../Icon'
import type { View } from '../types'
import './Footer.css'

type FooterProps = {
  navigate: (view: View) => void
}

export const Footer = ({ navigate }: FooterProps) => (
  <footer className="footer">
    <button className="footer__brand" onClick={() => navigate('about')}>
      stem together.
    </button>
    <span className="footer__tagline">
      Different paths. A shared sense of possibility.
    </span>
    <span className="footer__note">
      Made for your next chapter <Icon name="leaf" size={14} />
    </span>
  </footer>
)
