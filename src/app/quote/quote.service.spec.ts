import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quote } from './quote.model';

export class QuoteServiceStub {
  getQuotes(): Observable<Quote[]> {
    return of([
      {
        tariff_name: 'Basic electricity tariff',
        tariff_cost: 1333
      }
    ]);
  }
}

describe('QuoteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: QuoteService = TestBed.get(QuoteService);
    expect(service).toBeTruthy();
  });
});
