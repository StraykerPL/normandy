import { Icon } from '../../Icon'
import type { View } from '../../types'
import './AboutView.css'

type AboutViewProps = {
  navigate: (view: View) => void
}

export const AboutView = ({ navigate }: AboutViewProps) => (
  <section className="secondary-page about">
    <div className="eyebrow">OUR SHARED NEXT CHAPTER</div>
    <h1 className="page-title secondary-page__title">
      More possibility.
      <br />
      <em className="page-title__accent">Less figuring it out alone.</em>
    </h1>
    <p className="secondary-page__description">
      Stem Together connects girls exploring STEM at university with women who
      have stood in their shoes. You don’t need a perfect plan, top marks in
      everything, or all the answers to belong here.
    </p>
    <div className="about__grid">
      <article className="about__card">
        <Icon className="about__card-icon" name="people" />
        <h3 className="about__card-title">Someone who gets it</h3>
        <p className="about__card-text">
          Choose the doubts on your mind and meet students with shared
          experiences.
        </p>
      </article>
      <article className="about__card">
        <Icon className="about__card-icon" name="book" />
        <h3 className="about__card-title">Real perspectives</h3>
        <p className="about__card-text">
          Explore their stories, practical advice, and different paths into
          STEM.
        </p>
      </article>
      <article className="about__card">
        <Icon className="about__card-icon" name="chat" />
        <h3 className="about__card-title">A space to ask</h3>
        <p className="about__card-text">
          Open a one-to-one conversation and take your next step at your own
          pace.
        </p>
      </article>
    </div>
    <button
      className="button button--primary"
      onClick={() => navigate('discover')}
    >
      Find your person <Icon name="arrow" />
    </button>
  </section>
)
