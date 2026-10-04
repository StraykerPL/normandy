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
  back: () => void
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
  back,
}: ChatConversationProps) => (
  <div className="chat">
    <header className="chat__header">
      <button
        className="icon-button"
        aria-label="Wróć do historii"
        onClick={back}
      >
        <Icon name="back" />
      </button>
      <img src={chat.image} alt="" width={44} height={44} />
      <div>
        <h1>{chat.name}</h1>
        <p>
          {chat.subject} · {chat.university}
        </p>
      </div>
    </header>
    <div className="chat__messages">
      <div className="chat__notice">
        <Icon name="sparkle" />
        <h2>Rozmowa z {chat.name}</h2>
        <p>
          Możesz tutaj napisać wiadomość. To podgląd rozmowy — wiadomości nie są
          wysyłane.
        </p>
      </div>
      <div
        className="chat__history"
        role="log"
        aria-label="Wiadomości"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            className={`chat__message chat__message--${message.sender}`}
            key={message.id}
          >
            <p>{message.text}</p>
            <span>{message.time}</span>
          </div>
        ))}
        <div ref={end} />
      </div>
    </div>
    {error && (
      <p className="chat__error" role="alert">
        {error}
      </p>
    )}
    <form className="chat__form" onSubmit={send}>
      <label className="sr-only" htmlFor="message">
        Twoja wiadomość
      </label>
      <textarea
        id="message"
        className="chat__input"
        placeholder="Napisz wiadomość..."
        rows={1}
        value={draft}
        maxLength={1000}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button
        className="button button--primary chat__send"
        aria-label="Dodaj wiadomość do podglądu"
        disabled={!draft.trim() || sending}
      >
        <Icon name="send" />
      </button>
    </form>
  </div>
)
