import { Icon } from '../../Icon'
import type { Dispatch, SetStateAction } from 'react'
import { categories } from '../../../models'
import './DoubtsPanel.css'

type DoubtsPanelProps = {
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

export const DoubtsPanel = ({ selected, setSelected }: DoubtsPanelProps) => (
  <section className="doubts-panel">
    <div className="section-label">
      <span className="section-label__step">01</span>
      <h2 className="section-label__title">What’s on your mind?</h2>
      <span className="doubts-panel__optional">Pick as many as you like</span>
    </div>
    <p className="doubts-panel__description">
      Whatever you’re feeling, someone here has felt it too.
    </p>
    <div className="doubts-panel__categories">
      {categories.map((c) => (
        <button
          className={`doubts-panel__category ${selected.includes(c.id) ? 'doubts-panel__category--selected' : ''}`}
          key={c.id}
          aria-pressed={selected.includes(c.id)}
          onClick={() =>
            setSelected((prev) =>
              prev.includes(c.id)
                ? prev.filter((id) => id !== c.id)
                : [...prev, c.id],
            )
          }
        >
          <Icon name={c.icon} className="doubts-panel__category-icon" />
          <span>{c.label}</span>
          <span className="doubts-panel__check">
            {selected.includes(c.id) ? (
              <Icon
                className="doubts-panel__check-icon"
                name="check"
                size={13}
              />
            ) : (
              '+'
            )}
          </span>
        </button>
      ))}
    </div>
    <div className="doubts-panel__note">
      <Icon name="sparkle" size={15} />
      <span>
        {selected.length
          ? `Your matches are updated for ${selected.length} ${selected.length === 1 ? 'doubt' : 'doubts'}.`
          : 'A small step toward your next big thing.'}
      </span>
      {selected.length > 0 && (
        <button className="doubts-panel__clear" onClick={() => setSelected([])}>
          Clear selections
        </button>
      )}
    </div>
  </section>
)
