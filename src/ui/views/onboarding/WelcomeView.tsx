import { Brand } from '../../layout/Brand'
import { Icon } from '../../Icon'

import './WelcomeView.css'

export const WelcomeView = ({ start }: { start: () => void }) => (
  <section className="welcome">
    <header>
      <Brand />
      <p className="welcome__tagline">Technologia jest też Twoim miejscem.</p>
    </header>
    <div className="welcome__illustration">
      <img
        src="/illustrations/techbestie-girls.png"
        alt="Trzy uśmiechnięte dziewczyny zainteresowane technologią"
        width={1024}
        height={1024}
      />
    </div>
    <div className="welcome__content">
      <span className="welcome__badge">
        <Icon name="sparkle" size={14} /> JESTEŚ WE WŁAŚCIWYM MIEJSCU
      </span>
      <h1>
        Znajdź kogoś, kto{' '}
        <span className="welcome__script">był tam, gdzie Ty.</span>
      </h1>
      <p className="welcome__description">
        Poznaj studentki kierunków technologicznych, przeczytaj ich historie i
        zapytaj o to, co naprawdę Cię ciekawi.
      </p>
      <button className="button button--primary button--wide" onClick={start}>
        Dalej <Icon name="arrow" size={18} />
      </button>
      <p className="welcome__note">Kilka pytań i poznasz swoje TechBesties</p>
    </div>
  </section>
)
