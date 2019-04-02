import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('250ms', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('250ms', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
