import type { Mentor, MentorRepository, SurveyAnswers } from '../models'
import { localRepository } from '../data/localRepository'

export class MentorService {
  private repository: MentorRepository

  constructor(repository: MentorRepository) {
    this.repository = repository
  }

  getMentors = () => {
    return this.repository.getMentors()
  }

  match = (mentors: Mentor[], selected: string[]) => {
    return mentors
      .filter(
        (m) =>
          !selected.length || selected.some((id) => m.categories.includes(id)),
      )
      .sort((a, b) => this.score(b, selected) - this.score(a, selected))
  }

  score = (mentor: Mentor, selected: string[]) => {
    return selected.filter((id) => mentor.categories.includes(id)).length
  }

  recommend = (mentors: Mentor[], answers: SurveyAnswers) => {
    return [...mentors].sort(
      (a, b) => this.surveyScore(b, answers) - this.surveyScore(a, answers),
    )
  }

  surveyScore = (mentor: Mentor, answers: SurveyAnswers) => {
    const fieldScore =
      answers.fields.filter((field) => mentor.fields.includes(field)).length * 2
    const subjectScore = answers.subjects.includes(mentor.schoolSubject) ? 1 : 0
    const universityScore = answers.universities.includes(mentor.university)
      ? 2
      : 0

    return (
      fieldScore +
      subjectScore +
      universityScore +
      this.score(mentor, answers.doubts)
    )
  }

  getMessages = (id: string) => {
    return this.repository.getMessages(id)
  }

  sendMessage = (id: string, text: string) => {
    return this.repository.sendMessage(id, text)
  }
}

export const mentorService = new MentorService(localRepository)
