export interface Task {
  id: string;
  title: string;
  completed: boolean;
  important: boolean;
  inProgress: boolean;
  archived: boolean;
  dueDate: Date;
  description?: string;
  tags?: string[];
}