import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Schedule {
  scheduleDate?: string;
  scheduleDateFrom: string;
  scheduleDateTo: string;
  personName: string;
  notes?: string;
  personRank: string;
  schedulePlace: string;
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private baseUrl =
    'https://reminder-e5a24-default-rtdb.firebaseio.com/schedule';

  constructor(private http: HttpClient) {}

  getAll(): Observable<(Schedule & { id: string })[]> {
    const token = atob(String(localStorage.getItem('userToken')));
    return this.http
      .get<{ [key: string]: Schedule }>(`${this.baseUrl}.json`, {
        params: new HttpParams().set('auth', token),
      })
      .pipe(
        map((resData) => {
          const schedules: (Schedule & { id: string })[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              schedules.push({ id: key, ...resData[key] });
            }
          }
          return schedules;
        })
      );
  }

  add(schedule: Schedule): Observable<Schedule> {
    const token = atob(String(localStorage.getItem('userToken')));
    return this.http.post<Schedule>(`${this.baseUrl}.json`, schedule, {
      params: new HttpParams().set('auth', token),
    });
  }

  delete(id: string): Observable<void> {
    const token = atob(String(localStorage.getItem('userToken')));
    return this.http.delete<void>(`${this.baseUrl}/${id}.json`, {
      params: new HttpParams().set('auth', token),
    });
  }
}
