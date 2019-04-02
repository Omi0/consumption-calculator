import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-search',
  templateUrl: './quote-search.component.html',
  styleUrls: ['./quote-search.component.scss']
})
export class QuoteSearchComponent implements OnInit {
  public errorMessage: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  getQuotes(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (!value) {
      this.errorMessage = 'Please enter consumption amount';
    } else if (isNaN(parseFloat(value))) {
      this.errorMessage = 'Consumption amount must be a number';
    } else {
      // Encoding consumption amount to Base64 and navigating to result page
      this.router.navigate(['quote', encodeURIComponent(btoa(value))]);
    }
  }
}
