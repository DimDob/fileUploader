export interface File {
  filename: string,
  revision: string
}

export interface FileResponse {
  message: string;
  filename: string;
  file_path: string;
  revision: number;
  uploaded_at: string;
}
