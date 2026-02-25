import { ServerSideParams } from "@/types/datatable.types";

// ─── Entity ───────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  join_date: string;  // Laravel convention: snake_case
  score: number;
}

// ─── Laravel Pagination Meta ──────────────────────────────────────────────────
// Sesuai format bawaan Laravel paginator:
// https://laravel.com/docs/pagination

export interface LaravelPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface LaravelPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

// ─── API Response ─────────────────────────────────────────────────────────────
// Contoh response Laravel dengan wrapper:
//
// {
//   "success": true,
//   "message": "Users retrieved successfully",
//   "data": {
//     "data": [...],
//     "meta": { "current_page": 1, "total": 87, ... },
//     "links": { "first": "...", "next": "..." }
//   }
// }

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  meta: LaravelPaginationMeta;
  links: LaravelPaginationLinks;
}

export type GetUsersResponse = ApiResponse<PaginatedData<User>>;

// ─── API Request Params ───────────────────────────────────────────────────────
// Query params yang dikirim ke Laravel:
// GET /api/users?page=1&per_page=10&search=alice&sort_by=name&sort_dir=asc

export interface GetUsersParams {
  page: number;
  per_page: number;
  search?: string;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

// ─── Mapper: ServerSideParams → GetUsersParams ────────────────────────────────

export function toGetUsersParams(params: ServerSideParams): GetUsersParams {
  const sortCol = params.sorting[0];

  return {
    page: params.page,
    per_page: params.pageSize,
    search: params.search || undefined,
    sort_by: sortCol?.id,
    sort_dir: sortCol ? (sortCol.desc ? "desc" : "asc") : undefined,
  };
}