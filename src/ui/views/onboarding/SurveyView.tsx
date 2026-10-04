import type { SurveyAnswers } from '../../../models'
import { surveyQuestions } from '../../../data/survey'
import { Icon } from '../../Icon'
import './SurveyView.css'

type SurveyViewProps = {
  step: number
  answers: SurveyAnswers
  toggleChoice: (key: keyof SurveyAnswers, value: string) => void
  back: () => void
  next: () => void
}

export const SurveyView = ({
  step,
  answers,
  toggleChoice,
  back,
  next,
}: SurveyViewProps) => {
  const question = surveyQuestions[step]

  return (
    <section className="survey">
      <header className="survey__header">
        <button className="icon-button" aria-label="Wróć" onClick={back}>
          <Icon name="back" />
        </button>
        <span>
          {step + 1} z {surveyQuestions.length}
        </span>
      </header>
      <div
        className="survey__progress"
        role="progressbar"
        aria-label="Postęp ankiety"
        aria-valuemin={1}
        aria-valuemax={4}
        aria-valuenow={step + 1}
      >
        {surveyQuestions.map((item, index) => (
          <span
            key={item.key}
            className={`survey__segment ${index <= step ? 'survey__segment--active' : ''}`}
          />
        ))}
      </div>
      <div className="survey__question">
        <p className="eyebrow">{question.eyebrow}</p>
        <h1>{question.title}</h1>
        <p className="survey__hint">{question.hint}</p>
        <p className="survey__multiple">
          Możesz zaznaczyć więcej niż jedną odpowiedź
        </p>
      </div>
      <div className="survey__choices">
        {question.choices.map(({ value, label }) => {
          const selected = answers[question.key].includes(value)

          return (
            <button
              key={value}
              className={`survey__choice ${selected ? 'survey__choice--selected' : ''}`}
              aria-pressed={selected}
              onClick={() => toggleChoice(question.key, value)}
            >
              {label}
              <span className="survey__check">
                {selected && <Icon name="check" size={15} />}
              </span>
            </button>
          )
        })}
      </div>
      <div className="survey__actions">
        <button className="button button--primary button--wide" onClick={next}>
          {step === 3 ? 'Pokaż moje TechBesties' : 'Dalej'}
          <Icon name="arrow" size={18} />
        </button>
        <p>Nie musisz mieć wszystkich odpowiedzi już teraz.</p>
      </div>
    </section>
  )
}
