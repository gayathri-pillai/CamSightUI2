import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackEmployeeService {

  constructor(private http: HttpClient) { }

  sendImage(employee) {
    return this.http.post(`http://localhost:5000/upload/${employee.name}`, employee.image);
  }

  trackEmployee(employee) {
    return this.http.get(`http://localhost:5000/videoRip/${employee.replace(" ", "-")}`);
  }

  streamVideo() {
    return this.http.get('http://localhost:5000/videoStream');
  }
}
