export interface DashboardStats {
  openVacancies: number;
  activeCandidates: number;
  interviewsThisWeek: number;
  avgTimeToHire: number;
}

export interface DashboardTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface DashboardEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface DashboardNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface DashboardActivity {
  id: string;
  description: string;
  timestamp: string;
  type: "candidate" | "vacancy" | "note" | "file" | "task" | "email" | "event" | "company" | "other";
  user?: string;
}
