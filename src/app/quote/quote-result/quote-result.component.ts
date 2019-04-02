import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../quote.service';
import { Observable } from 'rxjs';
import { Quote } from '../quote.model';

@Component({
  selector: 'app-quote-result',
  templateUrl: './quote-result.component.html',
  styleUrls: ['./quote-result.component.scss']
})
export class QuoteResultComponent implements OnInit {
  public quotes$: Observable<Quote[]>;
  public consumption: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    const encodedAmount: string = this.route.snapshot.params.amount;

    // Checking if correcly encoded consumption amount provided
    // Otherwise redirecting to 'quote' page
    try {
      const decodedAmount: any = atob(decodeURIComponent(encodedAmount));
      if (!isNaN(decodedAmount)) {
        this.consumption = decodedAmount;
        this.quotes$ = this.quoteService.getQuotes(decodedAmount);
      } else {
        this.router.navigate(['quote']);
      }
    } catch (error) {
      this.router.navigate(['quote']);
    }
  }

  /**
   * Navigating to Search Form on 'Esc' button click
   */
  @HostListener('document:keydown.escape', ['$event'])
  escapeKeydownHandler(event: KeyboardEvent): void {
    this.router.navigate(['quote']);
  }
}
