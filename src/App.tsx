import { useEffect, useRef, useState } from 'react'
import type { Mentor, Message } from './models'
import { mentorService } from './services/mentorService'
import './ui/shared.css'
import './ui/layout/AppShell.css'
import type { View } from './ui/types'
import { Sidebar } from './ui/layout/Sidebar'
import { Topbar } from './ui/layout/Topbar'
import { Footer } from './ui/layout/Footer'
import { DetailDialog } from './ui/layout/DetailDialog'
import { DiscoverView } from './ui/views/discover/DiscoverView'
import { ConversationsView } from './ui/views/messages/ConversationsView'
import { AboutView } from './ui/views/about/AboutView'

const App = () => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [view, setView] = useState<View>('discover')
  const [profile, setProfile] = useState<Mentor | null>(null)
  const [chat, setChat] = useState<Mentor | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [saved, setSaved] = useState<string[]>(() =>
    mentorService.getSavedProfiles(),
  )
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All subjects')
  const end = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    mentorService
      .getMentors()
      .then(setMentors)
      .catch(() =>
        setError('We couldn’t load the mentors. Please refresh to try again.'),
      )
  }, [])

  useEffect(() => {
    if (profile || chat) dialog.current?.showModal()
    else dialog.current?.close()
  }, [profile, chat])

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest' })
  }, [messages])

  const matches = mentorService
    .match(mentors, view === 'saved' ? [] : selected)
    .filter(
      (m) =>
        (view !== 'saved' || saved.includes(m.id)) &&
        (filter === 'All subjects' || m.subject === filter),
    )

  const toggleSave = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((s) => s !== id)
      : [...saved, id]

    setSaved(next)
    mentorService.saveProfiles(next)
  }

  const openChat = async (mentor: Mentor) => {
    setProfile(null)
    setChat(mentor)
    setMessages([])
    setDraft('')
    setError('')
    try {
      setMessages(await mentorService.getMessages(mentor.id))
    } catch {
      setError('Couldn’t load this conversation. Please try again.')
    }
  }

  const send = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!chat || !draft.trim() || sending) return
    setSending(true)
    try {
      setMessages(await mentorService.sendMessage(chat.id, draft.trim()))
      setDraft('')
    } catch {
      setError('Your message wasn’t sent. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const navigate = (next: View) => {
    setView(next)
    setFilter('All subjects')
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} savedCount={saved.length} navigate={navigate} />
      <main className="app-shell__main">
        <Topbar />
        {view === 'discover' || view === 'saved' ? (
          <DiscoverView
            view={view}
            mentors={mentors}
            matches={matches}
            selected={selected}
            setSelected={setSelected}
            saved={saved}
            filter={filter}
            setFilter={setFilter}
            error={error}
            toggleSave={toggleSave}
            setProfile={setProfile}
            navigate={navigate}
          />
        ) : view === 'messages' ? (
          <ConversationsView mentors={mentors} openChat={openChat} />
        ) : (
          <AboutView navigate={navigate} />
        )}
        <Footer navigate={navigate} />
      </main>
      <DetailDialog
        dialog={dialog}
        end={end}
        chat={chat}
        profile={profile}
        setProfile={setProfile}
        setChat={setChat}
        saved={saved}
        openChat={openChat}
        toggleSave={toggleSave}
        messages={messages}
        draft={draft}
        setDraft={setDraft}
        sending={sending}
        error={error}
        send={send}
      />
    </div>
  )
}

export default App
