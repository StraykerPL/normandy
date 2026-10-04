import type { Mentor } from '../../../models'
import { Brand } from '../../layout/Brand'
import { Icon } from '../../Icon'
import { MentorCard } from './MentorCard'

import './DiscoverView.css'

type DiscoverViewProps = {
  mentors: Mentor[]
  matches: Mentor[]
  scores: Record<string, number>
  activeFilters: string[]
  tab: 'home' | 'stories' | 'matches'
  setProfile: (mentor: Mentor) => void
  openChat: (mentor: Mentor) => void
  editAnswers: () => void
  openFilters: () => void
  clearFilters: () => void
}

export const DiscoverView = ({
  mentors,
  matches,
  scores,
  activeFilters,
  tab,
  setProfile,
  openChat,
  editAnswers,
  openFilters,
  clearFilters,
}: DiscoverViewProps) => (
  <div className="discover">
    <header className="discover__header">
      <div>
        <Brand compact />
        <p>Małe kroki. Wielkie możliwości.</p>
      </div>
      <button
        className="icon-button"
        aria-label="Zmień odpowiedzi w ankiecie"
        onClick={editAnswers}
      >
        <Icon name="user" />
      </button>
    </header>
    {tab === 'home' && (
      <section className="discover__hero">
        <p className="discover__hello">CZEŚĆ! ✦</p>
        <h1>Twoja droga do tech zaczyna się tutaj.</h1>
        <p className="discover__subtitle">Nie musisz iść nią sama.</p>
        <img
          src="/illustrations/techbestie-girls.png"
          alt=""
          width={1024}
          height={1024}
        />
        <span className="discover__reassurance">
          <Icon name="heart" size={13} />
          Tu możesz pytać o wszystko
        </span>
      </section>
    )}
    {tab !== 'stories' && (
      <section className="discover__matches" aria-labelledby="matches-title">
        <div className="discover__heading">
          <div>
            <p className="eyebrow">WYBRANE DLA CIEBIE</p>
            <h2 id="matches-title">Twoje TechBesties</h2>
          </div>
          <button
            className="icon-button icon-button--square"
            aria-label="Filtruj studentki"
            onClick={openFilters}
          >
            <Icon name="filter" />
          </button>
        </div>
        {activeFilters.length > 0 && (
          <p className="discover__filters">
            Aktywne filtry: {activeFilters.join(' · ')}
          </p>
        )}
        <div className="discover__list">
          {matches.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              matched={scores[mentor.id] > 0}
              setProfile={setProfile}
              openChat={openChat}
            />
          ))}
        </div>
        {matches.length === 0 && (
          <div className="empty-state">
            <Icon name="search" size={28} />
            <h3>Nie ma studentek dla tych filtrów.</h3>
            <p>Spróbuj wybrać inny kierunek lub uczelnię.</p>
            <button className="text-button" onClick={clearFilters}>
              Wyczyść filtry
            </button>
          </div>
        )}
      </section>
    )}
    {tab !== 'matches' && (
      <section className="discover__stories" aria-labelledby="stories-title">
        <div className="discover__heading">
          <div>
            <p className="eyebrow">PRAWDZIWE PERSPEKTYWY</p>
            <h2 id="stories-title">Historie studentek</h2>
          </div>
          <Icon name="heart" className="discover__heart" />
        </div>
        <div className="discover__story-list">
          {mentors.map((mentor) => (
            <button
              key={mentor.id}
              className={`story-card story-card--${mentor.color}`}
              onClick={() => setProfile(mentor)}
            >
              <img
                src={mentor.image}
                alt=""
                width={48}
                height={48}
                loading="lazy"
              />
              <h3>{mentor.name}</h3>
              <p>„{mentor.quote}”</p>
              <span>
                Czytaj historię <Icon name="arrow" size={15} />
              </span>
            </button>
          ))}
        </div>
      </section>
    )}
    <button className="text-button discover__edit" onClick={editAnswers}>
      Zmień odpowiedzi w ankiecie <Icon name="arrow" size={16} />
    </button>
  </div>
)
