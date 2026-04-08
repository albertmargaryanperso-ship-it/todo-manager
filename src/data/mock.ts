import type { TaskType } from "../components/board/TaskCard";

export const mockData: TaskType[] = [
  {
    id: "FRONT-824",
    title: "Implement drag and drop context for Kanban board",
    priority: "high",
    status: "todo",
    assigneeAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    commentsCount: 3,
    subtasks: { completed: 1, total: 4 }
  },
  {
    id: "FRONT-825",
    title: "Setup dark mode palette and glassmorphism shaders",
    priority: "urgent",
    status: "todo",
    assigneeAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "FRONT-810",
    title: "Refactor global state using Zustand instead of Redux for lighter bundle",
    priority: "medium",
    status: "in-progress",
    assigneeAvatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    commentsCount: 12,
    subtasks: { completed: 3, total: 5 }
  },
  {
    id: "FRONT-812",
    title: "Write End-to-End tests for main authentication flow",
    priority: "low",
    status: "in-progress"
  },
  {
    id: "FRONT-790",
    title: "Auditer les performances Lighthouse (Objectif: 99+)",
    priority: "medium",
    status: "done",
    assigneeAvatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    commentsCount: 1
  },
  {
    id: "FRONT-781",
    title: "Initialiser le repositoire monorepo Turborepo",
    priority: "high",
    status: "done",
    subtasks: { completed: 2, total: 2 }
  }
];
