export type Category = { id: string; label: string; icon: string };
export type Mentor = {
  id: string;
  name: string;
  subject: string;
  university: string;
  year: string;
  image: string;
  categories: string[];
  quote: string;
  story: string;
  advice: string;
  color: string;
};
export type Message = {
  id: string;
  sender: "you" | "mentor";
  text: string;
  time: string;
};
export interface MentorRepository {
  getMentors: () => Promise<Mentor[]>;
  getMessages: (id: string) => Promise<Message[]>;
  sendMessage: (id: string, text: string) => Promise<Message[]>;
}

export const categories: Category[] = [
  { id: "belonging", label: "Will I fit in?", icon: "people" },
  { id: "confidence", label: "Am I good enough?", icon: "sparkle" },
  { id: "major", label: "Choosing a major", icon: "book" },
  { id: "career", label: "Future & careers", icon: "compass" },
  { id: "balance", label: "Study–life balance", icon: "sun" },
  { id: "money", label: "Costs & scholarships", icon: "wallet" },
];
