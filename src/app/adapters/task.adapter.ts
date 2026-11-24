import { Task } from '../models/task.model';
import { CreateTaskPayload, TaskApiDto } from '../models/task-api.model';

const CATEGORY_LABELS: Record<string, string> = {
  desenvolupament: 'Desenvolupament',
  formularis: 'Formularis',
    optimitzacio: 'Optimització',
    qualitat: 'Qualitat',
    documentacio: 'Documentació',
    accessibilitat: 'Accessibilitat',
    lliurament: 'Lliurament'
};

export function adaptTaskFromApi(dto: TaskApiDto): Task {
  const rawTitle = (dto.title ?? '').trim();
  const rawDescription = (dto.description ?? '').trim();
  const rawCategoryKey = (dto.category ?? 'general').trim().toLowerCase();
  const rawStatus = (dto.status ?? 'pendent').trim();
  const rawDate = (dto.dueDate ?? '2026-11-01').trim();

  const parsedId = Number(dto.id);
  const safeId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : Date.now();

  const parsedHours = Number(dto.estimatedHours);
  const safeHours = Number.isFinite(parsedHours) && parsedHours >= 0 ? parsedHours : 1;

  const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
  ? `${rawDate}T09:00:00`
  : rawDate;

  return {
    id: safeId,
    titol: rawTitle.length > 0 ? rawTitle : 'Tasca sense títol',
    descripcio: rawDescription.length > 0 ? rawDescription : 'Sense descripció disponible.',
    categoria: CATEGORY_LABELS[rawCategoryKey] ?? (rawCategoryKey || 'General'),
    estat: rawStatus.length > 0 ? rawStatus : 'pendent',
    data: normalizedDate,
    hores: safeHours,
    destacada: Boolean(dto.featured)
  };
}

export function adaptTaskListFromApi(dtos: TaskApiDto[]): Task[] {
  if (!Array.isArray(dtos)) {
    return [];
  }
  return dtos.map(adaptTaskFromApi);
}

export function adaptTaskToApiPayload(input: {
  titol: string;
  descripcio: string;
  categoria: string;
  data: string;
  hores: number;
  destacada?: boolean;
}): CreateTaskPayload {
  const categoryKey = input.categoria.trim().toLowerCase();
  const cleanDate = input.data.trim().slice(0, 10) || '2026-11-20';
  const safeHours = Number.isFinite(Number(input.hores)) && Number(input.hores) >= 0
  ? Number(input.hores)
  : 1;

  return {
    title: input.titol.trim(),
    description: input.descripcio.trim() || 'Sense descripció disponible.',
    category: categoryKey || 'desenvolupament',
    status: 'pendent',
    dueDate: cleanDate,
    estimatedHours: safeHours,
    featured: Boolean(input.destacada)
  };
}
