import { Routes } from '@angular/router';
import { QuoteSearchComponent } from './quote-search/quote-search.component';
import { QuoteResultComponent } from './quote-result/quote-result.component';

// Routes
export const quoteRoutes: Routes = [
  {
    path: 'quote',
    component: QuoteSearchComponent
  },
  {
    path: 'quote/:amount',
    component: QuoteResultComponent
  },
  {
    path: '',
    redirectTo: 'quote',
    pathMatch: 'full'
  }
];
