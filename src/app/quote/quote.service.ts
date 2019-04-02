import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../core/core.model';
import { Quote } from './quote.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getQuotes(consumptionAmount: number): Observable<Quote[]> {
    return this.http
      .get<IResponse<Quote[]>>(`${environment.api}/tariffsGet`, {
        params: new HttpParams({
          fromObject: {
            consumption: consumptionAmount.toString()
          }
        })
      })
      .pipe(
        map(res => {
          // Soring by tariff_cost ascending
          if (res.data && Array.isArray(res.data)) {
            return res.data.sort((a, b) => a.tariff_cost - b.tariff_cost);
          }
          return of([]) as any;
        })
      );
  }
}
