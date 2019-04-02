import { ActivatedRoute } from '@angular/router';
import { quoteRoutes } from '../quote.routes';
import { Location } from '@angular/common';

import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuoteResultComponent } from './quote-result.component';
import { QuoteSearchComponent } from '../quote-search/quote-search.component';

import { QuoteService } from '../quote.service';
import { QuoteServiceStub } from '../quote.service.spec';

const ActivatedRouteMock = {
  snapshot: {
    params: {
      amount: 'MjM0'
    }
  }
};

describe('QuoteResultComponent', () => {
  let location: Location;
  let component: QuoteResultComponent;
  let fixture: ComponentFixture<QuoteResultComponent>;
  let de: DebugElement;
  let quoteService: QuoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(quoteRoutes), HttpClientModule],
      declarations: [QuoteResultComponent, QuoteSearchComponent],
      providers: [
        { provide: QuoteService, useClass: QuoteServiceStub },
        { provide: ActivatedRoute, useFactory: () => ActivatedRouteMock }
      ]
    }).compileComponents();

    location = TestBed.get(Location);
    quoteService = TestBed.get(QuoteService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteResultComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should decode Base64 params`, fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.consumption).toEqual('234');
  }));

  it(`should return to search component when Esc clicked`, fakeAsync(() => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape'
      })
    );
    tick();
    expect(location.path()).toBe('/quote');
  }));

  it(`should get quotes and render and format results`, fakeAsync(() => {
    component.quotes$.subscribe(quotes => {
      expect(quotes).toBeDefined();
      expect(
        de.query(By.css('.tariff-name')).nativeElement.innerText
      ).toContain('tariff');
      expect(
        de.query(By.css('.tariff-cost')).nativeElement.innerText
      ).toBe('€1,333');
    });
  }));
});
