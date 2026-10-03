import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import './ConversationsView.css'

type ConversationsViewProps = {
  mentors: Mentor[]
  openChat: (mentor: Mentor) => void
}

export const ConversationsView = ({
  mentors,
  openChat,
}: ConversationsViewProps) => (
  <section className="secondary-page">
    <div className="eyebrow">A PERSON IN YOUR CORNER</div>
    <h1 className="page-title secondary-page__title">
      Your <em className="page-title__accent">conversations.</em>
    </h1>
    <p className="secondary-page__description">
      Start a conversation with someone who understands.
    </p>
    <div className="conversation-list">
      {mentors.map((m) => (
        <button
          className="conversation-list__item"
          key={m.id}
          onClick={() => openChat(m)}
        >
          <img className="conversation-list__avatar" src={m.image} alt="" />
          <div>
            <strong className="conversation-list__name">{m.name}</strong>
            <span className="conversation-list__details">
              {m.subject} · {m.university}
            </span>
          </div>
          <Icon name="chat" className="conversation-list__icon" />
        </button>
      ))}
    </div>
  </section>
)
