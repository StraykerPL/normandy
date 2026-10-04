import { useRef, useState } from 'react'
import type { Mentor } from '../../../models'
import { Icon } from '../../Icon'

type StoryListProps = {
  mentors: Mentor[]
  setProfile: (mentor: Mentor) => void
}

export const StoryList = ({ mentors, setProfile }: StoryListProps) => {
  const listRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ x: number; scrollLeft: number } | null>(null)
  const movedRef = useRef(false)
  const [dragging, setDragging] = useState(false)
  const scrollStories = (direction: number) => {
    const list = listRef.current
    const card = list?.querySelector<HTMLElement>('.story-card')

    if (!list || !card) return

    list.scrollBy({ left: direction * (card.offsetWidth + 12), behavior: 'smooth' })
  }

  return (
    <>
      <div className="discover__story-controls" aria-label="Przewijanie historii">
        <button type="button" className="icon-button" aria-label="Poprzednia historia" onClick={() => scrollStories(-1)}>
          <Icon name="back" />
        </button>
        <button type="button" className="icon-button" aria-label="Następna historia" onClick={() => scrollStories(1)}>
          <Icon name="arrow" />
        </button>
      </div>
      <div
        ref={listRef}
        className={`discover__story-list${dragging ? ' discover__story-list--dragging' : ''}`}
        role="region"
        aria-labelledby="stories-title"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return

          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            scrollStories(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
        onPointerDown={(event) => {
          movedRef.current = false

          if (event.pointerType !== 'mouse' || event.button !== 0) return

          dragRef.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current

          if (!drag) return

          const distance = event.clientX - drag.x

          if (!movedRef.current && Math.abs(distance) < 6) return

          movedRef.current = true
          setDragging(true)
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.scrollLeft = drag.scrollLeft - distance
        }}
        onPointerUp={() => {
          dragRef.current = null
          setDragging(false)
        }}
        onPointerCancel={() => {
          dragRef.current = null
          setDragging(false)
        }}
        onLostPointerCapture={() => {
          dragRef.current = null
          setDragging(false)
        }}
        onPointerLeave={() => {
          if (!movedRef.current) dragRef.current = null
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (movedRef.current) {
            event.preventDefault()
            event.stopPropagation()
            movedRef.current = false
          }
        }}
      >
        {mentors.map((mentor) => (
          <button
            type="button"
            key={mentor.id}
            className={`story-card story-card--${mentor.color}`}
            onClick={() => setProfile(mentor)}
          >
            <img src={mentor.image} alt="" width={48} height={48} loading="lazy" draggable={false} />
            <h3>{mentor.name}</h3>
            <p>„{mentor.quote}”</p>
            <span>Czytaj historię <Icon name="arrow" size={15} /></span>
          </button>
        ))}
      </div>
    </>
  )
}
