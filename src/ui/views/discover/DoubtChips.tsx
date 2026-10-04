import { categories } from '../../../models'
import { surveyQuestions } from '../../../data/survey'
import { Icon } from '../../Icon'
import './DoubtChips.css'

type DoubtChipsProps = {
  selected: string[]
  setSelected: (selected: string[]) => void
}

const doubtChoices = surveyQuestions.find((question) => question.key === 'doubts')?.choices ?? []

export const DoubtChips = ({ selected, setSelected }: DoubtChipsProps) => (
  <div className="doubt-chips" role="group" aria-label="Filtruj historie według wątpliwości">
    <p className="doubt-chips__hint">Co chodzi Ci po głowie? Wybierz dowolne pytania.</p>
    <div className="doubt-chips__options">
      {categories.map((category) => {
        const active = selected.includes(category.id)
        const label = doubtChoices.find((choice) => choice.value === category.id)?.label ?? 'Koszty i stypendia'

        return (
          <button
            key={category.id}
            type="button"
            className={`doubt-chips__chip${active ? ' doubt-chips__chip--selected' : ''}`}
            aria-pressed={active}
            onClick={() => setSelected(active
              ? selected.filter((id) => id !== category.id)
              : [...selected, category.id])}
          >
            <Icon name={active ? 'check' : category.icon} size={16} />
            {label}
          </button>
        )
      })}
    </div>
    {selected.length > 0 && (
      <button type="button" className="text-button doubt-chips__clear" onClick={() => setSelected([])}>
        Wyczyść filtry
      </button>
    )}
  </div>
)
