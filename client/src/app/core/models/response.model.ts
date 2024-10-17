export interface SuccessResponse {
    raw: [];
    affected: number;     
}

export interface ErrorResponse {
    message: {
      error: string
    },
    status: number
}

export interface DeleteSuccessResponse {
  success: boolean; 
  id: string;
}