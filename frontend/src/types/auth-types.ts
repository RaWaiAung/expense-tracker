export interface AuthResponse {
  _id: string;
  username: string;
  profileImageUrl: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// Response for file upload endpoints
export interface UploadResponse {
  imageUrl: string;
  filename: string;
  originalname: string;
}

export interface GetProfileResponse {
  _id: string;
  fullname: string;
  profileImageUrl: string;
  email: string;
  role: string;
}
