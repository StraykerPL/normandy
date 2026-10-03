import type { Mentor, MentorRepository } from "../models";
import {
  getSavedProfiles,
  localRepository,
  saveProfiles,
} from "../data/localRepository";

export class MentorService {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  getSavedProfiles = () => {
    return getSavedProfiles();
  };

  saveProfiles = (ids: string[]) => {
    saveProfiles(ids);
  };

  getMentors = () => {
    return this.repository.getMentors();
  };

  match = (mentors: Mentor[], selected: string[]) => {
    return mentors
      .filter(
        (m) =>
          !selected.length || selected.some((id) => m.categories.includes(id)),
      )
      .sort((a, b) => this.score(b, selected) - this.score(a, selected));
  };

  score = (mentor: Mentor, selected: string[]) => {
    return selected.filter((id) => mentor.categories.includes(id)).length;
  };

  getMessages = (id: string) => {
    return this.repository.getMessages(id);
  };

  sendMessage = (id: string, text: string) => {
    return this.repository.sendMessage(id, text);
  };
}

export const mentorService = new MentorService(localRepository);
