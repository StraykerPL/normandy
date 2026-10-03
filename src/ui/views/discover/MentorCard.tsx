import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import { categories } from '../../../models'
import './MentorCard.css'

type MentorCardProps = {
  mentor: Mentor
  selected: string[]
  saved: string[]
  toggleSave: (id: string) => void
  setProfile: (mentor: Mentor) => void
}

export const MentorCard = ({
  mentor,
  selected,
  saved,
  toggleSave,
  setProfile,
}: MentorCardProps) => (
  <article className="mentor-card">
    <div
      className={`mentor-card__portrait surface-tone surface-tone--${mentor.color}`}
    >
      <img
        className="mentor-card__image"
        src={mentor.image}
        alt={`${mentor.name}, ${mentor.subject} student`}
      />
      <span className="mentor-card__year">{mentor.year} student</span>
      <button
        aria-label={`${saved.includes(mentor.id) ? 'Unsave' : 'Save'} ${mentor.name}'s profile`}
        aria-pressed={saved.includes(mentor.id)}
        className={`mentor-card__save ${saved.includes(mentor.id) ? 'mentor-card__save--saved' : ''}`}
        onClick={() => toggleSave(mentor.id)}
      >
        <Icon name="bookmark" className="mentor-card__save-icon" size={18} />
      </button>
      <span className="mentor-card__decoration">✧</span>
    </div>
    <div className="mentor-card__content">
      <div className="mentor-card__name">
        <h3 className="mentor-card__title">{mentor.name}</h3>
        <span className="mentor-card__availability" title="Open to a chat" />
      </div>
      <strong className="mentor-card__subject">{mentor.subject}</strong>
      <p className="mentor-card__university">{mentor.university}</p>
      <div className="tags">
        {mentor.categories.slice(0, 2).map((id) => (
          <span
            key={id}
            className={`tags__item ${selected.includes(id) ? 'tags__item--matched' : ''}`}
          >
            {categories.find((c) => c.id === id)?.label}
          </span>
        ))}
      </div>
      <blockquote className="mentor-card__quote">{mentor.quote}</blockquote>
      <button
        className="mentor-card__profile-button"
        onClick={() => setProfile(mentor)}
      >
        Meet {mentor.name}
        <Icon name="arrow" size={18} />
      </button>
    </div>
  </article>
)
