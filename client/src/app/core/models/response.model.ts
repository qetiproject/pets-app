export interface SuccessResponse {
    raw: [];
    affected: number;     
}

export interface ErrorResponse {
    message: {
      errorMessage: string
    },
    status: number
}

export interface DeleteSuccessResponse {
  success: boolean; 
  id?: string;
  username?: string;
}