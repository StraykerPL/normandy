import type { Mentor, MentorRepository, Message } from "../models";

const mentors: Mentor[] = [
  {
    id: "maya",
    name: "Maya",
    subject: "Computer Science",
    university: "University of Bristol",
    year: "3rd year",
    image: "/portraits/maya.jpg",
    categories: ["belonging", "confidence", "major"],
    quote:
      "“I thought everyone would know more than me. Turns out, we were all figuring it out.”",
    story:
      "In sixth form, I loved solving problems but had never written a line of code. I worried that everyone else would have years of experience, and that I wouldn’t belong. In my first week, I met other women starting from scratch. We built a study group, asked the questions we were afraid to ask, and learned together. Now I’m building my first app and helping new students find their feet.",
    advice:
      "You don’t need to arrive knowing everything. Try a small project that interests you, visit an open day, and talk to someone studying the course. Curiosity matters much more than having a head start.",
    color: "peach",
  },
  {
    id: "aisha",
    name: "Aisha",
    subject: "Mechanical Engineering",
    university: "University of Manchester",
    year: "2nd year",
    image: "/portraits/aisha.jpg",
    categories: ["belonging", "career", "balance"],
    quote:
      "“Being one of the few girls felt scary. Finding my people changed everything.”",
    story:
      "I liked physics, but couldn’t picture myself as an engineer. At an open day, a female student showed me her project and suddenly it felt possible. Starting university still felt big, but joining the engineering society helped me find friends and confidence. I’m now exploring sustainable design through a student team.",
    advice:
      "Find people who make you feel comfortable asking questions. Your perspective belongs in engineering, and you can explore different careers before deciding what you want to do.",
    color: "lilac",
  },
  {
    id: "ella",
    name: "Ella",
    subject: "Biomedical Sciences",
    university: "University of Leeds",
    year: "3rd year",
    image: "/portraits/ella.jpg",
    categories: ["confidence", "major", "money", "balance"],
    quote:
      "“You don’t have to have your whole future planned to take the first step.”",
    story:
      "I was torn between biology and medicine, and worried about the cost of university. Speaking to students helped me understand what each course was really like. I chose biomedical sciences because I enjoy exploring how the body works. Applying for university bursaries and planning my week made the transition easier.",
    advice:
      "Look at the actual modules, not just the course title. Ask the university about bursaries and support, and remember that changing your mind as you learn is part of the process.",
    color: "sage",
  },
  {
    id: "sophie",
    name: "Sophie",
    subject: "Mathematics",
    university: "University of Edinburgh",
    year: "2nd year",
    image: "/portraits/sophie.jpg",
    categories: ["confidence", "career", "money"],
    quote:
      "“Struggling with a problem doesn’t mean you aren’t a maths person.”",
    story:
      "I thought being good at maths meant getting every answer right straight away. University taught me that getting stuck is part of learning. Office hours and working with friends helped me stop comparing myself to everyone else. I’m now discovering careers in data and research that I never knew existed.",
    advice:
      "Keep a record of what you’ve learned, especially on hard days. Ask for help early, and give yourself time to understand something new.",
    color: "pink",
  },
];

const memory = new Map<string, Message[]>();

const read = (id: string): Message[] => {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(`stem-chat-${id}`) || "null",
    );

    if (
      Array.isArray(stored) &&
      stored.every(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.time === "string" &&
          (item.sender === "you" || item.sender === "mentor"),
      )
    )
      return stored as Message[];
  } catch {
    /* Fall back to session storage in memory. */
  }

  return memory.get(id) || [];
};

const write = (id: string, messages: Message[]) => {
  memory.set(id, messages);
  try {
    localStorage.setItem(`stem-chat-${id}`, JSON.stringify(messages));
  } catch {
    /* In-memory fallback. */
  }
};

export const localRepository: MentorRepository = {
  getMentors: async () => {
    return mentors;
  },

  getMessages: async (id) => {
    return read(id);
  },

  sendMessage: async (id, text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messages: Message[] = [
      ...read(id),
      { id: crypto.randomUUID(), sender: "you", text, time },
    ];

    write(id, messages);

    return messages;
  },
};

export const getSavedProfiles = (): string[] => {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem("stem-saved") || "[]",
    );

    return Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

export const saveProfiles = (ids: string[]) => {
  try {
    localStorage.setItem("stem-saved", JSON.stringify(ids));
  } catch {
    /* UI retains the bookmarks for this session. */
  }
};
