export interface ApiResponse<T> {
  message: string[];
  statusCode: number;
  content: T;
  error: string;
}