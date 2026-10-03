import { Icon } from '../Icon'
import type { View } from '../types'
import './Sidebar.css'

type SidebarProps = {
  view: View
  savedCount: number
  navigate: (view: View) => void
}

export const Sidebar = ({ view, savedCount, navigate }: SidebarProps) => (
  <aside className="sidebar">
    <a
      className="brand"
      href="#"
      onClick={(e) => {
        e.preventDefault()
        navigate('discover')
      }}
    >
      <span className="brand__mark">
        <Icon name="sparkle" size={25} />
      </span>
      <span>
        stem
        <span className="brand__second">
          together<span className="brand__dot">.</span>
        </span>
      </span>
    </a>
    <span className="sidebar__nav-caption">YOUR NEXT CHAPTER</span>
    <nav className="sidebar__nav" aria-label="Main navigation">
      {(
        [
          ['discover', 'compass', 'Find your person'],
          ['messages', 'chat', 'My conversations'],
          ['saved', 'bookmark', 'Saved profiles'],
        ] as const
      ).map(([key, icon, label]) => (
        <button
          className={`sidebar__nav-item ${view === key ? 'sidebar__nav-item--active' : ''}`}
          key={key}
          onClick={() => navigate(key)}
        >
          <Icon name={icon} className="sidebar__nav-icon" />
          <span>{label}</span>
          {key === 'saved' && savedCount > 0 && (
            <small className="sidebar__count">{savedCount}</small>
          )}
        </button>
      ))}
    </nav>
    <div className="sidebar__note">
      <span className="sidebar__flower">✳</span>
      <h3 className="sidebar__note-title">You belong here.</h3>
      <p className="sidebar__note-text">
        STEM has room for your ideas.
        <br />
        And for you, exactly as you are.
      </p>
      <button
        className="sidebar__note-button"
        onClick={() => navigate('about')}
      >
        A little about us <Icon name="arrow" size={16} />
      </button>
    </div>
    <div className="sidebar__bottom">
      <span className="sidebar__avatar">J</span>
      <div>
        <strong className="sidebar__user-name">Your space</strong>
        <span className="sidebar__user-caption">Let’s explore what’s next</span>
      </div>
      <span className="sidebar__spark">✧</span>
    </div>
  </aside>
)
