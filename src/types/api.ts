export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "UNAUTHORIZED"
  | "INSUFFICIENT_CREDITS"
  | "PROVIDER_UNAVAILABLE"
  | "SERVER_CONFIG_ERROR"
  | "INTERNAL_ERROR"
  | "BAD_REQUEST"
  | "CLIENT_ABORTED";

export interface ApiValidationIssue {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  code: ApiErrorCode;
  details?: string;
  issues?: ApiValidationIssue[];
  resetAt?: number;
}
