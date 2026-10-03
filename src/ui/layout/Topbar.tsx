import { Icon } from '../Icon'
import './Topbar.css'

export const Topbar = () => (
  <header className="topbar">
    <span>A little guidance. A lot of possibility.</span>
    <div className="topbar__community">
      <span className="status-dot" /> A community that gets you{' '}
      <Icon name="heart" className="topbar__icon" size={16} />
    </div>
  </header>
)
