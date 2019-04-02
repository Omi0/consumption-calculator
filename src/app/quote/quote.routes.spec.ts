import { TestBed, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NgZone } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { quoteRoutes } from './quote.routes';

import { QuoteResultComponent } from './quote-result/quote-result.component';
import { QuoteSearchComponent } from './quote-search/quote-search.component';

describe('QuoteRoutes', () => {
  let location: Location;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteSearchComponent, QuoteResultComponent],
      imports: [RouterTestingModule.withRoutes(quoteRoutes)]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    ngZone = TestBed.get(NgZone);
  }));

  it(`navigate to '' takes you to /quote`, fakeAsync(() => {
    ngZone
      .run(() => router.navigate(['']))
      .then(() => {
        expect(location.path()).toBe('/quote');
      });
  }));

  it(`navigate to 'quote' takes you to /quote`, fakeAsync(() => {
    ngZone
      .run(() => router.navigate(['quote']))
      .then(() => {
        expect(location.path()).toBe('/quote');
      });
  }));

  it(`navigate to 'quote/MjM0' takes you to /quote/MjM0`, fakeAsync(() => {
    ngZone
      .run(() => router.navigate(['quote/MjM0']))
      .then(() => {
        expect(location.path()).toBe('/quote/MjM0');
      });
  }));
});
