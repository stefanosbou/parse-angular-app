import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Landmark} from "../models/landmark.model";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.REST_API.BASE_URL + environment.REST_API.LANDMARKS_ENDPOINT;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  // GET landmarks from the server
  getLandmarks(): Observable<Landmark[]> {
    return this.httpClient.get<Landmark[]>(this.url, {headers: this.generateHeaderToken()});
  }

  // GET landmark by id
  getLandmarkById(landmarkId: string): Observable<Landmark> {
    const url = `${this.url}/${landmarkId}`;
    return this.httpClient.get<Landmark>(url, {headers: this.generateHeaderToken()});
  }

  // PUT update landmark
  updateLandmark(landmark: Landmark): Observable<Landmark> {
    const formData = new FormData();
    formData.append('title', landmark.title);
    formData.append('description', landmark.description);
    formData.append('url', landmark.url);
    formData.append('photo', landmark.image_file);

    const url = `${this.url}/${landmark.objectId}`;
    return this.httpClient.put<Landmark>(url, formData, {headers: this.generateHeaderToken()});
  }

  generateHeaderToken(): HttpHeaders {
    return new HttpHeaders({
      'X-Parse-Session-Token': this.authService.getSessionToken,
    });
  }
}
