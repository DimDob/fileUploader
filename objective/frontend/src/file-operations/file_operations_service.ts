import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {File as CustomFile, FileResponse} from '../login-page/Interfaces/file_interface'
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public endpoint = 'http://localhost:8000'

  http = inject(HttpClient)

  public uploadFile(formData: FormData): Observable<Object> {

    //TODO: uncomment when jwt is ready
    // httpParams.append('Authorisation', token)

    return this.http.post(`${this.endpoint}/upload/`, formData);
  }

  public receiveFile(userId: string, file: CustomFile): Observable<FileResponse> {
    let params = new HttpParams();

    params = params.set('user_id', userId);
    params = params.set('revision', file.revision);

    return this.http.get<FileResponse>(`${this.endpoint}/files/${file.filename}/`, { params: params });
  }

  public downloadFile(userId: string, file: CustomFile): Observable<Blob> {
    let params = new HttpParams()
      .set('user_id', userId)
      .set('revision', file.revision);

    return this.http.get(`${this.endpoint}/files/${file.filename}/download/`, {
      params,
      responseType: 'blob'
    });
  }
}
