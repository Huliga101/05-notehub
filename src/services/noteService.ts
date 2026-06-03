import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const PER_PAGE = 12;
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
}

export const fetchNotes = async ({
  page,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: PER_PAGE,
  };

  const trimmedSearch = search.trim();

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  const { data } = await api.get<FetchNotesResponse>("/", { params });
  return data;
};

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/${id}`);
  return data;
};