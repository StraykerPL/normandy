import { Icon } from '../Icon'
import './Brand.css'

export const Brand = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`brand ${compact ? 'brand--compact' : ''}`}
    aria-label="TechBestie"
  >
    <span>Tech</span>
    <span className="brand__script">Bestie</span>
    <Icon name="heart" size={14} className="brand__heart" />
  </div>
)
