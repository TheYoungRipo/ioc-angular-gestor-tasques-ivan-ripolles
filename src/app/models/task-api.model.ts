export interface TaskApiDto {
  id?: string | number;
  title?: string;
  description?: string;
  category?: string;
  status?: string;
  dueDate?: string;
  estimatedHours?: number | string;
  featured?: boolean;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate: string;
  estimatedHours: number;
  featured: boolean;
}
