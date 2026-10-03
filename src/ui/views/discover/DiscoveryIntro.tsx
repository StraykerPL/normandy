import './DiscoveryIntro.css'

type DiscoveryIntroProps = {
  view: 'discover' | 'saved'
}

export const DiscoveryIntro = ({ view }: DiscoveryIntroProps) => (
  <section className="discovery-intro">
    <div className="eyebrow">
      <span className="eyebrow__dot" /> YOU DON’T HAVE TO FIGURE IT OUT ALONE
    </div>
    <h1 className="page-title discovery-intro__title">
      {view === 'saved' ? (
        <>
          Your people,{' '}
          <em className="page-title__accent discovery-intro__title-accent">
            kept close.
          </em>
        </>
      ) : (
        <>
          Big dreams.{' '}
          <em className="page-title__accent discovery-intro__title-accent">
            Real questions.
          </em>
        </>
      )}
    </h1>
    <p className="discovery-intro__description">
      {view === 'saved' ? (
        'Come back to the students whose stories spoke to you.'
      ) : (
        <>
          Meet women studying STEM who had the same doubts.
          <br className="discovery-intro__break" /> Honest stories, helpful
          advice, and a person in your corner.
        </>
      )}
    </p>
    <div className="discovery-intro__doodle" aria-hidden="true">
      ✳
      <span className="discovery-intro__doodle-caption">
        your future
        <br />
        looks good on you
      </span>
      <svg className="discovery-intro__doodle-arrow" viewBox="0 0 90 35">
        <path d="M4 7c36 26 58 23 77 4m-12 0 13-1-4 13" />
      </svg>
    </div>
  </section>
)
