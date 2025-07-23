import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private apiUrl = 'http://localhost:5000/api/snippets';

  constructor(private http: HttpClient) { }

  getSnippets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addSnippet(snippet: any): Observable<any> {
    return this.http.post(this.apiUrl, snippet);
  }
}
