import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Mentor, Message, SurveyAnswers } from './models'
import { mentorService } from './services/mentorService'
import { WelcomeView } from './ui/views/onboarding/WelcomeView'
import { SurveyView } from './ui/views/onboarding/SurveyView'
import { DiscoverView } from './ui/views/discover/DiscoverView'
import { ProfileDetails } from './ui/views/profile/ProfileDetails'
import { ChatConversation } from './ui/views/messages/ChatConversation'
import { BottomNav } from './ui/layout/BottomNav'
import type { DiscoveryTab } from './ui/layout/BottomNav'
import { FilterDialog } from './ui/layout/FilterDialog'
import type { MentorFilters } from './ui/layout/FilterDialog'
import { Icon } from './ui/Icon'
import './ui/shared.css'
import './ui/layout/AppShell.css'

type Screen = 'welcome' | 'survey' | 'discover' | 'story' | 'chat'

const App = () => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [screen, setScreen] = useState<Screen>('welcome')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>({
    fields: [],
    subjects: [],
    universities: [],
    doubts: [],
  })
  const [tab, setTab] = useState<DiscoveryTab>('home')
  const [profile, setProfile] = useState<Mentor | null>(null)
  const [filters, setFilters] = useState<MentorFilters>({
    field: '',
    university: '',
  })
  const [filterOpen, setFilterOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [loadingChat, setLoadingChat] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [chatError, setChatError] = useState('')
  const end = useRef<HTMLDivElement>(null)
  const main = useRef<HTMLElement>(null)
  const chatRequest = useRef(0)

  useEffect(() => {
    mentorService
      .getMentors()
      .then(setMentors)
      .catch(() =>
        setError(
          'Nie udało się wczytać studentek. Odśwież stronę i spróbuj ponownie.',
        ),
      )
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [screen, step, tab])

  useEffect(() => {
    if (messages.length) end.current?.scrollIntoView({ block: 'nearest' })
  }, [messages])

  const ranked = mentorService.recommend(mentors, answers)
  const matches = ranked.filter(
    (mentor) =>
      (!filters.field || mentor.subject === filters.field) &&
      (!filters.university || mentor.university === filters.university),
  )
  const scores = Object.fromEntries(
    mentors.map((mentor) => [
      mentor.id,
      mentorService.surveyScore(mentor, answers),
    ]),
  )

  const toggleChoice = (key: keyof SurveyAnswers, value: string) => {
    setAnswers((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }))
  }

  const editAnswers = () => {
    setStep(0)
    setScreen('survey')
  }

  const openStory = (mentor: Mentor) => {
    setProfile(mentor)
    setScreen('story')
  }

  const openChat = async (mentor: Mentor) => {
    const request = ++chatRequest.current

    setProfile(mentor)
    setScreen('chat')
    setMessages([])
    setDraft('')
    setChatError('')
    setLoadingChat(true)
    try {
      const history = await mentorService.getMessages(mentor.id)

      if (request === chatRequest.current) setMessages(history)
    } catch {
      if (request === chatRequest.current)
        setChatError('Nie udało się wczytać rozmowy. Wróć i spróbuj ponownie.')
    } finally {
      if (request === chatRequest.current) setLoadingChat(false)
    }
  }

  const send = async (event: FormEvent) => {
    event.preventDefault()
    if (!profile || !draft.trim() || sending || loadingChat || chatError) return

    const request = chatRequest.current
    const text = draft.trim()

    setSending(true)
    try {
      const history = await mentorService.sendMessage(profile.id, text)

      if (request === chatRequest.current) {
        setMessages(history)
        setDraft('')
      }
    } catch {
      if (request === chatRequest.current)
        setChatError(
          'Nie udało się zapisać wiadomości. Wróć do rozmowy i spróbuj ponownie.',
        )
    } finally {
      setSending(false)
    }
  }

  const back = () => {
    chatRequest.current += 1
    setScreen(screen === 'chat' ? 'story' : 'discover')
  }

  return (
    <div className="app-shell">
      <main
        className="app-shell__main"
        ref={main}
        tabIndex={-1}
        aria-label="TechBestie"
      >
        {error && (
          <p className="app-shell__error" role="alert">
            {error}
          </p>
        )}
        {screen === 'welcome' && (
          <WelcomeView start={() => setScreen('survey')} />
        )}
        {screen === 'survey' && (
          <SurveyView
            step={step}
            answers={answers}
            toggleChoice={toggleChoice}
            back={() => (step === 0 ? setScreen('welcome') : setStep(step - 1))}
            next={() => (step < 3 ? setStep(step + 1) : setScreen('discover'))}
          />
        )}
        {screen === 'discover' && (
          <>
            <DiscoverView
              mentors={mentors}
              matches={matches}
              scores={scores}
              activeFilters={[filters.field, filters.university].filter(
                Boolean,
              )}
              tab={tab}
              setProfile={openStory}
              openChat={openChat}
              editAnswers={editAnswers}
              openFilters={() => setFilterOpen(true)}
              clearFilters={() => setFilters({ field: '', university: '' })}
            />
            <BottomNav tab={tab} navigate={setTab} />
          </>
        )}
        {(screen === 'story' || screen === 'chat') && profile && (
          <>
            {screen === 'story' && (
              <header className="app-shell__back">
                <button
                  className="icon-button"
                  aria-label="Wróć do studentek"
                  onClick={back}
                >
                  <Icon name="back" />
                </button>
                <span>JEJ HISTORIA</span>
              </header>
            )}
            {screen === 'story' ? (
              <ProfileDetails profile={profile} openChat={openChat} />
            ) : (
              <ChatConversation
                chat={profile}
                messages={messages}
                draft={draft}
                setDraft={setDraft}
                sending={sending || loadingChat || Boolean(chatError)}
                error={chatError}
                send={send}
                end={end}
                back={back}
              />
            )}
          </>
        )}
      </main>
      {filterOpen && (
        <FilterDialog
          mentors={mentors}
          filters={filters}
          close={() => setFilterOpen(false)}
          apply={(next) => {
            setFilters(next)
            setFilterOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App
