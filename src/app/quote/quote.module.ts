import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { quoteRoutes } from './quote.routes';

import { QuoteSearchComponent } from './quote-search/quote-search.component';
import { QuoteResultComponent } from './quote-result/quote-result.component';

@NgModule({
  declarations: [QuoteSearchComponent, QuoteResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(quoteRoutes)
  ],
  providers: []
})
export class QuoteModule {}
