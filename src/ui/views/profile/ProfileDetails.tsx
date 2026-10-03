import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import { categories } from '../../../models'
import './ProfileDetails.css'

type ProfileDetailsProps = {
  profile: Mentor
  openChat: (mentor: Mentor) => void
}

export const ProfileDetails = ({
  profile,
  openChat,
}: ProfileDetailsProps) => (
  <>
    <div
      className={`profile__hero surface-tone surface-tone--${profile.color}`}
    >
      <img className="profile__image" src={profile.image} alt={profile.name} />
      <div>
        <span className="eyebrow profile__eyebrow">
          YOUR BEEN-THERE-BEFORE PERSON
        </span>
        <h2 className="profile__title">
          Hi, I’m {profile.name}
          <span className="profile__decoration">✧</span>
        </h2>
        <p className="profile__summary">
          {profile.subject} · {profile.year}
        </p>
        <p className="profile__summary">{profile.university}</p>
      </div>
    </div>
    <div className="profile__body">
      <div className="tags profile__tags">
        {profile.categories.map((id) => (
          <span className="tags__item" key={id}>
            {categories.find((c) => c.id === id)?.label}
          </span>
        ))}
      </div>
      <blockquote className="profile__quote">{profile.quote}</blockquote>
      <h3 className="profile__section-title">How I got here</h3>
      <p className="profile__text">{profile.story}</p>
      <h3 className="profile__section-title">A little advice from me</h3>
      <p className="profile__text">{profile.advice}</p>
      <div className="profile__actions">
        <button
          className="button button--primary"
          onClick={() => openChat(profile)}
        >
          <Icon name="chat" />
          Chat with {profile.name}
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  </>
)
