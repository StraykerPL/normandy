import { Icon } from '../Icon'
import './BottomNav.css'

export type DiscoveryTab = 'home' | 'stories' | 'matches'

export const BottomNav = ({
  tab,
  navigate,
}: {
  tab: DiscoveryTab
  navigate: (tab: DiscoveryTab) => void
}) => (
  <nav className="bottom-nav" aria-label="Nawigacja główna">
    {(
      [
        ['home', 'home', 'Główna'],
        ['stories', 'book', 'Historie'],
        ['matches', 'heart', 'Dopasowane'],
      ] as const
    ).map(([key, icon, label]) => (
      <button
        className={`bottom-nav__item ${tab === key ? 'bottom-nav__item--active' : ''}`}
        aria-current={tab === key ? 'page' : undefined}
        key={key}
        onClick={() => navigate(key)}
      >
        <Icon name={icon} size={20} />
        {label}
      </button>
    ))}
  </nav>
)
