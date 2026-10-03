import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import type { Dispatch, SetStateAction } from 'react'
import type { View } from '../../types'
import { DiscoveryIntro } from './DiscoveryIntro'
import { DoubtsPanel } from './DoubtsPanel'
import { MentorCard } from './MentorCard'
import { Reassurance } from './Reassurance'
import './DiscoverView.css'

type DiscoverViewProps = {
  view: 'discover' | 'saved'
  mentors: Mentor[]
  matches: Mentor[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  saved: string[]
  filter: string
  setFilter: (filter: string) => void
  error: string
  toggleSave: (id: string) => void
  setProfile: (mentor: Mentor) => void
  navigate: (view: View) => void
}

export const DiscoverView = ({
  view,
  mentors,
  matches,
  selected,
  setSelected,
  saved,
  filter,
  setFilter,
  error,
  toggleSave,
  setProfile,
  navigate,
}: DiscoverViewProps) => (
  <>
    <DiscoveryIntro view={view} />
    {view === 'discover' && (
      <DoubtsPanel selected={selected} setSelected={setSelected} />
    )}
    <section className="mentors">
      <div className="mentors__heading">
        <div>
          <div className="section-label">
            <span className="section-label__step">
              {view === 'saved' ? <Icon name="bookmark" size={15} /> : '02'}
            </span>
            <h2 className="section-label__title">
              {view === 'saved'
                ? 'Your saved profiles'
                : 'Meet your been-there-before people'}
            </h2>
          </div>
          <p className="mentors__description">
            {selected.length
              ? 'A little shared experience can make a big difference.'
              : 'Different journeys. Shared experiences. Here for you.'}
          </p>
        </div>
        <label className="mentors__filter">
          <select
            className="mentors__filter-select"
            aria-label="Filter mentors by subject"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All subjects</option>
            {mentors.map((m) => (
              <option key={m.id}>{m.subject}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mentors__results">
        <span>
          {matches.length}{' '}
          {view === 'saved' ? 'saved profiles' : 'students to get to know'}
        </span>
        <span className="mentors__availability">
          <span className="status-dot" /> Open to a chat
        </span>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="mentors__grid">
        {matches.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            selected={selected}
            saved={saved}
            toggleSave={toggleSave}
            setProfile={setProfile}
          />
        ))}
      </div>
      {matches.length === 0 && (
        <div className="empty-state">
          <Icon name="bookmark" size={30} className="empty-state__icon" />
          <h3 className="empty-state__title">
            {view === 'saved'
              ? 'Your next connection is waiting'
              : 'Let’s widen the search'}
          </h3>
          <p className="empty-state__description">
            {view === 'saved'
              ? 'Save a profile with the bookmark button to find it here.'
              : 'Try another subject or clear your selections to meet more students.'}
          </p>
          <button
            className="button button--primary"
            onClick={() => {
              navigate('discover')
              setSelected([])
            }}
          >
            Explore all students <Icon name="arrow" size={18} />
          </button>
        </div>
      )}
    </section>
    <Reassurance />
  </>
)
