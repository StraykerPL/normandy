import { Icon } from '../../Icon'
import type { Mentor, Message } from '../../../models'
import type { FormEvent, RefObject } from 'react'
import './ChatConversation.css'

type ChatConversationProps = {
  chat: Mentor
  messages: Message[]
  draft: string
  setDraft: (draft: string) => void
  sending: boolean
  error: string
  send: (event: FormEvent) => void
  end: RefObject<HTMLDivElement | null>
}

export const ChatConversation = ({
  chat,
  messages,
  draft,
  setDraft,
  sending,
  error,
  send,
  end,
}: ChatConversationProps) => (
  <div className="chat">
    <div className="chat__header">
      <img className="chat__avatar" src={chat.image} alt="" />
      <div>
        <h2 className="chat__title">{chat.name}</h2>
        <p className="chat__subject">
          <span className="status-dot" /> {chat.subject}
        </p>
      </div>
    </div>
    <div className="chat__privacy">
      <Icon name="lock" size={14} /> Your one-to-one space
    </div>
    <div className="chat__messages" aria-live="polite">
      <p className="chat__date">A new connection starts here</p>
      {messages.map((m) => (
        <div className={`chat__message chat__message--${m.sender}`} key={m.id}>
          <p className="chat__message-text">{m.text}</p>
          <span className="chat__message-meta">
            {m.sender === 'you' ? 'You' : chat.name} · {m.time}
          </span>
        </div>
      ))}
      <div ref={end} />
    </div>
    {error && <p role="alert">{error}</p>}
    <form className="chat__form" onSubmit={send}>
      <input
        className="chat__input"
        aria-label="Message"
        placeholder={`Ask ${chat.name} what’s on your mind…`}
        value={draft}
        maxLength={2000}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button
        className="chat__send"
        aria-label="Send message"
        disabled={!draft.trim() || sending}
      >
        <Icon name="arrow" />
      </button>
    </form>
  </div>
)
