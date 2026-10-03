import { Icon } from '../../Icon'
import './Reassurance.css'

export const Reassurance = () => (
  <section className="reassurance">
    <span className="reassurance__icon">
      <Icon name="heart" size={24} />
    </span>
    <div>
      <h3 className="reassurance__title">No perfect questions needed.</h3>
      <p className="reassurance__text">
        You can be curious, unsure, or just starting to explore. This space is
        for you.
      </p>
    </div>
    <span className="reassurance__star">✳</span>
  </section>
)
