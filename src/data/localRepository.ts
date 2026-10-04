import type { Mentor, MentorRepository, Message } from '../models'

const mentors: Mentor[] = [
  {
    id: 'maja',
    name: 'Maja',
    subject: 'Inżynieria',
    schoolSubject: 'Fizyka',
    fields: ['Inżynieria'],
    university: 'Politechnika Warszawska',
    year: '2. rok',
    image: '/portraits/maja.jpg',
    categories: ['belonging', 'confidence', 'major', 'balance', 'career'],
    quote:
      'Myślałam, że nie pasuję. Teraz projektuję rzeczy, z których jestem dumna.',
    story:
      'Na początku bałam się, że wszyscy będą wiedzieli więcej ode mnie. Okazało się, że prawie każdy zaczynał z podobnymi pytaniami. Na zajęciach znalazłam osoby, z którymi mogę eksperymentować, mylić się i próbować od nowa. Nie trzeba mieć gotowego planu, żeby zrobić pierwszy krok.',
    advice:
      'Studentka inżynierii, która lubi prototypować, rozkładać rzeczy na części i opowiadać o prawdziwym życiu na uczelni.',
    color: 'peach',
  },
  {
    id: 'amara',
    name: 'Amara',
    subject: 'Sztuczna inteligencja',
    schoolSubject: 'Matematyka',
    fields: ['Sztuczna inteligencja', 'Informatyka', 'Analiza danych'],
    university: 'Uniwersytet Warszawski',
    year: '3. rok',
    image: '/portraits/amara.jpg',
    categories: ['confidence', 'belonging', 'major', 'career', 'money'],
    quote: 'Bałam się pierwszej linijki kodu. Dziś tworzę własne projekty.',
    story:
      'Zanim poszłam na studia, byłam przekonana, że trzeba programować od dziecka. Nie trzeba. Zaczęłam od małych projektów i pytałam o wszystko, czego nie rozumiałam. Najbardziej pomogły mi rozmowy z dziewczynami, które były trochę dalej na tej samej drodze.',
    advice:
      'Studentka AI, która chętnie rozmawia o nauce programowania od zera i przełamywaniu obaw.',
    color: 'lilac',
  },
  {
    id: 'lena',
    name: 'Lena',
    subject: 'UX / design',
    schoolSubject: 'Plastyka / projektowanie',
    fields: ['UX / design'],
    university: 'AGH',
    year: '2. rok',
    image: '/portraits/lena.jpg',
    categories: ['belonging', 'confidence', 'major', 'balance', 'career'],
    quote: 'Nie wiedziałam, że kreatywność i technologia mogą iść razem.',
    story:
      'Lubiłam rysować i rozwiązywać problemy, ale nie wiedziałam, że mogę połączyć te dwie rzeczy. Projektowanie produktów cyfrowych dało mi taką możliwość. Moja droga nie była prosta i właśnie dlatego lubię o niej opowiadać.',
    advice:
      'Studentka projektowania, która łączy kreatywność z technologią i lubi pokazywać różne drogi do branży.',
    color: 'pink',
  },
]
const memory = new Map<string, Message[]>()

const read = (id: string): Message[] => {
  if (memory.has(id)) return memory.get(id) || []

  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(`stem-chat-${id}`) || 'null',
    )

    if (
      Array.isArray(stored) &&
      stored.every(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.text === 'string' &&
          typeof item.time === 'string' &&
          (item.sender === 'you' || item.sender === 'mentor'),
      )
    )
      return stored as Message[]
  } catch {
    /* Fall back to session storage in memory. */
  }

  return memory.get(id) || []
}

const write = (id: string, messages: Message[]) => {
  memory.set(id, messages)
  try {
    localStorage.setItem(`stem-chat-${id}`, JSON.stringify(messages))
  } catch {
    /* In-memory fallback. */
  }
}

export const localRepository: MentorRepository = {
  getMentors: async () => {
    return mentors
  },

  getMessages: async (id) => {
    return read(id)
  },

  sendMessage: async (id, text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const messages: Message[] = [
      ...read(id),
      { id: crypto.randomUUID(), sender: 'you', text, time },
    ]

    write(id, messages)

    return messages
  },
}
