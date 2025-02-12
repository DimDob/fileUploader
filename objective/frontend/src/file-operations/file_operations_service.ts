import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  http = inject(HttpClient)

  public uploadFile(formData: FormData): Observable<Object> {

    //TODO: uncomment when jwt is ready
    // httpParams.append('Authorisation', token)

    return this.http.post('http://localhost:8000/upload/', formData);
  }
}
