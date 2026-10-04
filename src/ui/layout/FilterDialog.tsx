import { useEffect, useRef, useState } from 'react'
import type { Mentor } from '../../models'
import { Icon } from '../Icon'
import './FilterDialog.css'

export type MentorFilters = { field: string; university: string }

type FilterDialogProps = {
  mentors: Mentor[]
  filters: MentorFilters
  apply: (filters: MentorFilters) => void
  close: () => void
}

export const FilterDialog = ({
  mentors,
  filters,
  apply,
  close,
}: FilterDialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState(filters)

  useEffect(() => {
    const element = dialog.current

    element?.showModal()

    return () => element?.close()
  }, [])

  return (
    <dialog
      ref={dialog}
      className="filter-dialog"
      aria-labelledby="filter-title"
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="filter-dialog__heading">
        <h2 id="filter-title">Filtruj studentki</h2>
        <button
          className="icon-button"
          aria-label="Zamknij filtry"
          onClick={close}
        >
          <Icon name="close" />
        </button>
      </div>
      <p className="filter-dialog__hint">
        Znajdź osobę, z którą chcesz porozmawiać.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          apply(draft)
        }}
      >
        <label className="filter-dialog__label" htmlFor="filter-field">
          Kierunek
        </label>
        <select
          id="filter-field"
          value={draft.field}
          onChange={(event) =>
            setDraft({ ...draft, field: event.target.value })
          }
        >
          <option value="">Wszystkie kierunki</option>
          {[...new Set(mentors.map((mentor) => mentor.subject))].map(
            (field) => (
              <option key={field}>{field}</option>
            ),
          )}
        </select>
        <label className="filter-dialog__label" htmlFor="filter-university">
          Uczelnia
        </label>
        <select
          id="filter-university"
          value={draft.university}
          onChange={(event) =>
            setDraft({ ...draft, university: event.target.value })
          }
        >
          <option value="">Wszystkie uczelnie</option>
          {[...new Set(mentors.map((mentor) => mentor.university))].map(
            (university) => (
              <option key={university}>{university}</option>
            ),
          )}
        </select>
        <button
          className="button button--primary button--wide filter-dialog__apply"
          type="submit"
        >
          Pokaż studentki
          <Icon name="arrow" size={18} />
        </button>
        <button
          className="text-button filter-dialog__reset"
          type="button"
          onClick={() => apply({ field: '', university: '' })}
        >
          Wyczyść filtry
        </button>
      </form>
    </dialog>
  )
}
