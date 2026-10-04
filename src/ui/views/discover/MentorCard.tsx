import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import './MentorCard.css'

type MentorCardProps = {
  mentor: Mentor
  matched: boolean
  setProfile: (mentor: Mentor) => void
  openChat: (mentor: Mentor) => void
}

export const MentorCard = ({
  mentor,
  matched,
  setProfile,
  openChat,
}: MentorCardProps) => (
  <article className="mentor-card">
    <div className="mentor-card__header">
      <span className="avatar-ring">
        <img src={mentor.image} alt={mentor.name} width={56} height={56} />
      </span>
      <div className="mentor-card__details">
        <div className="mentor-card__heading">
          <h3>{mentor.name}</h3>
          {matched && (
            <span className="mentor-card__match">Pasuje do Ciebie ✦</span>
          )}
        </div>
        <p>
          {mentor.subject} · {mentor.university}
        </p>
      </div>
    </div>
    <p className="mentor-card__quote">„{mentor.quote}”</p>
    <div className="mentor-card__actions">
      <button
        className="button button--secondary"
        onClick={() => setProfile(mentor)}
      >
        <Icon name="book" size={16} />
        Historia
      </button>
      <button
        className="button button--primary"
        onClick={() => openChat(mentor)}
      >
        <Icon name="chat" size={16} />
        Napisz
      </button>
    </div>
  </article>
)
