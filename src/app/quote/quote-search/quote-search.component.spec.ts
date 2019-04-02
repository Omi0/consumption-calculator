import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';

import { QuoteSearchComponent } from './quote-search.component';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('QuoteSearchComponent', () => {
  let component: QuoteSearchComponent;
  let fixture: ComponentFixture<QuoteSearchComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [QuoteSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input value should be numeric', fakeAsync(() => {
    const input: HTMLInputElement = de.query(By.css('input')).nativeElement;
    input.value = '123';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('123');
  }));

  it('input value should be empty', fakeAsync(() => {
    const input: HTMLInputElement = de.query(By.css('input')).nativeElement;
    input.value = 'text';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('');
  }));

  it('errorMessage should be shown', fakeAsync(() => {
    component.errorMessage = 'message';
    fixture.detectChanges();
    const element: HTMLElement = de.query(By.css('p')).nativeElement;
    expect(element.textContent).toBe('message');
  }));

  it('keypress.enter on input should take to result page', fakeAsync(() => {
    spyOn((component as any).router, 'navigate').and.returnValue(true);
    const input: HTMLInputElement = de.query(By.css('input')).nativeElement;
    input.value = '123';
    input.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: 'Enter'
      })
    );
    component.getQuotes(input);
    expect((component as any).router.navigate).toHaveBeenCalledWith([
      'quote',
      'MTIz'
    ]);
  }));

  it('click on button should take to result page', fakeAsync(() => {
    spyOn((component as any).router, 'navigate').and.returnValue(true);
    de.query(By.css('input')).nativeElement.value = '123';
    de.query(By.css('button')).nativeElement.dispatchEvent(new Event('click'));
    expect((component as any).router.navigate).toHaveBeenCalledWith([ 'quote', 'MTIz' ]);
  }));
});
