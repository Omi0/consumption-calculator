// @see https://jsonapi.org/format/#error-objects
export interface ApiError {
  code: number;
  status: string;
  message: string;
  errors?: ApiErrorDetail[];
}

export interface ApiErrorDetail {
  source?: string;
  title: string;
  detail?: string;
}

export interface ApiResponse<T = {}> {
  status?: string;
  data?: T;
}
