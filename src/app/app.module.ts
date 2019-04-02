import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuoteModule } from './quote/quote.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QuoteModule,
    RouterModule.forRoot([] as Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
