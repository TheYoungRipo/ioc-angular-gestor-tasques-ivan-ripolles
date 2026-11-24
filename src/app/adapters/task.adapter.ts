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
  const rawTitle = typeof dto?.title === 'string' ? dto.title.trim() : '';
  const rawDescription = typeof dto?.description === 'string' ? dto.description.trim() : '';
  const rawCategoryKey =
  typeof dto?.category === 'string' ? dto.category.trim().toLowerCase() : 'general';
  const rawStatus = typeof dto?.status === 'string' ? dto.status.trim() : 'pendent';
  const rawDate = typeof dto?.dueDate === 'string' ? dto.dueDate.trim() : '2026-11-01';

  const parsedId = Number(dto?.id);
  const safeId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : Date.now();

  const parsedHours = Number(dto?.estimatedHours);
  const safeHours = Number.isFinite(parsedHours) && parsedHours >= 0 ? parsedHours : 1;

  const normalizedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
  ? `${rawDate}T09:00:00`
  : rawDate || '2026-11-01T09:00:00';

  return {
    id: safeId,
    titol: rawTitle.length > 0 ? rawTitle : 'Tasca sense títol',
    descripcio: rawDescription.length > 0 ? rawDescription : 'Sense descripció disponible.',
    categoria: CATEGORY_LABELS[rawCategoryKey] ?? (rawCategoryKey || 'General'),
    estat: rawStatus.length > 0 ? rawStatus : 'pendent',
    data: normalizedDate,
    hores: safeHours,
    destacada: Boolean(dto?.featured)
  };
}

export function adaptTaskListFromApi(dtos: TaskApiDto[]): Task[] {
  if (!Array.isArray(dtos)) {
    return [];
  }
  return dtos.map((dto) => adaptTaskFromApi(dto));
}

export function adaptTaskToApiPayload(input: {
  titol: string;
  descripcio: string;
  categoria: string;
  data: string;
  hores: number;
  destacada?: boolean;
}): CreateTaskPayload {
  const categoryKey = (input.categoria ?? '').trim().toLowerCase();
  const cleanDate = (input.data ?? '').trim().slice(0, 10) || '2026-11-20';
  const parsedHours = Number(input.hores);
  const safeHours = Number.isFinite(parsedHours) && parsedHours >= 0 ? parsedHours : 1;

  return {
    title: (input.titol ?? '').trim(),
    description: (input.descripcio ?? '').trim() || 'Sense descripció disponible.',
    category: categoryKey || 'desenvolupament',
    status: 'pendent',
    dueDate: cleanDate,
    estimatedHours: safeHours,
    featured: Boolean(input.destacada)
  };
}
