import { Icon } from '../../Icon'
import type { Mentor } from '../../../models'
import './ProfileDetails.css'

type ProfileDetailsProps = {
  profile: Mentor
  openChat: (mentor: Mentor) => void
}

export const ProfileDetails = ({ profile, openChat }: ProfileDetailsProps) => (
  <section className="profile">
    <div className="avatar-ring avatar-ring--large">
      <img src={profile.image} alt={profile.name} width={96} height={96} />
    </div>
    <h1>Poznaj {profile.name}</h1>
    <p className="profile__summary">
      {profile.subject} · {profile.university}
    </p>
    <blockquote className="profile__quote">
      <Icon name="heart" />
      <p>„{profile.quote}”</p>
    </blockquote>
    <h2>Moja historia</h2>
    <p className="profile__text">{profile.story}</p>
    <h2>O czym możemy porozmawiać?</h2>
    <p className="profile__text">{profile.advice}</p>
    <div className="profile__actions">
      <button
        className="button button--primary button--wide"
        onClick={() => openChat(profile)}
      >
        <Icon name="chat" size={18} />
        Napisz do {profile.name}
        <Icon name="arrow" size={18} />
      </button>
    </div>
  </section>
)
