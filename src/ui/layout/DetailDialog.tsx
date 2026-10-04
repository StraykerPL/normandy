import { Icon } from '../Icon'
import type { Mentor, Message } from '../../models'
import type { FormEvent, RefObject } from 'react'
import { ProfileDetails } from '../views/profile/ProfileDetails'
import { ChatConversation } from '../views/messages/ChatConversation'
import './DetailDialog.css'

type DetailDialogProps = {
  dialog: RefObject<HTMLDialogElement | null>
  end: RefObject<HTMLDivElement | null>
  chat: Mentor | null
  profile: Mentor | null
  setProfile: (mentor: Mentor | null) => void
  setChat: (mentor: Mentor | null) => void
  openChat: (mentor: Mentor) => void
  messages: Message[]
  draft: string
  setDraft: (draft: string) => void
  sending: boolean
  error: string
  send: (event: FormEvent) => void
}

export const DetailDialog = ({
  dialog,
  end,
  chat,
  profile,
  setProfile,
  setChat,
  openChat,
  messages,
  draft,
  setDraft,
  sending,
  error,
  send,
}: DetailDialogProps) => (
  <dialog
    ref={dialog}
    aria-label={
      chat
        ? `Chat with ${chat.name}`
        : profile
          ? `${profile.name}'s profile`
          : 'Student profile'
    }
    className={`detail-dialog ${chat ? 'detail-dialog--chat' : ''}`}
    onCancel={() => {
      setProfile(null)
      setChat(null)
    }}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setProfile(null)
        setChat(null)
      }
    }}
  >
    <button
      className="detail-dialog__close"
      aria-label="Close"
      onClick={() => {
        setProfile(null)
        setChat(null)
      }}
    >
      <Icon name="close" />
    </button>
    {profile && (
      <ProfileDetails
        profile={profile}
        openChat={openChat}
      />
    )}
    {chat && (
      <ChatConversation
        chat={chat}
        messages={messages}
        draft={draft}
        setDraft={setDraft}
        sending={sending}
        error={error}
        send={send}
        end={end}
        back={() => {
          setProfile(chat)
          setChat(null)
        }}
      />
    )}
  </dialog>
)
