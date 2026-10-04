import type { SurveyAnswers } from '../models'

type SurveyQuestion = {
  key: keyof SurveyAnswers
  eyebrow: string
  title: string
  hint: string
  choices: { value: string; label: string }[]
}

const choices = (labels: string[]) =>
  labels.map((label) => ({ value: label, label }))

export const surveyQuestions: SurveyQuestion[] = [
  {
    key: 'fields',
    eyebrow: '01 / KIERUNKI',
    title: 'Co Cię ciekawi?',
    hint: 'Wybierz kierunki, które bierzesz pod uwagę.',
    choices: choices([
      'Informatyka',
      'Sztuczna inteligencja',
      'Inżynieria',
      'UX / design',
      'Analiza danych',
      'Jeszcze nie wiem',
    ]),
  },
  {
    key: 'subjects',
    eyebrow: '02 / PRZEDMIOTY',
    title: 'Co lubisz w szkole?',
    hint: 'Nie musisz być w tym najlepsza — wystarczy, że Cię interesuje.',
    choices: choices([
      'Matematyka',
      'Informatyka',
      'Fizyka',
      'Plastyka / projektowanie',
      'Biologia',
      'Nie mam jeszcze ulubionego',
    ]),
  },
  {
    key: 'universities',
    eyebrow: '03 / UCZELNIE',
    title: 'Myślisz o jakiejś uczelni?',
    hint: 'Możesz wybrać kilka albo zostawić to otwarte.',
    choices: choices([
      'Politechnika Warszawska',
      'AGH',
      'Uniwersytet Warszawski',
      'Politechnika Wrocławska',
      'Inna uczelnia',
      'Jeszcze nie wiem',
    ]),
  },
  {
    key: 'doubts',
    eyebrow: '04 / TWOJE PYTANIA',
    title: 'Co chodzi Ci po głowie?',
    hint: 'O to właśnie możesz zapytać studentkę.',
    choices: [
      { value: 'confidence', label: 'Czy sobie poradzę?' },
      { value: 'belonging', label: 'Czy znajdę tam swoje miejsce?' },
      { value: 'major', label: 'Który kierunek wybrać?' },
      { value: 'balance', label: 'Jak wyglądają studia?' },
      { value: 'career', label: 'Co można robić po studiach?' },
    ],
  },
]
