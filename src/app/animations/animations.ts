import { trigger, state, style, transition, animate } from '@angular/animations';

export const RightSlideOut = [
    trigger('slideInOut', [
        state('in', style({
            transform: 'translateX(0)'
        })),
        state('complete', style({
            opacity: '0'
        })),
        state('remove', style({
            transform: 'translateX(-200%)'
        })),
        state('removeAll', style({
            transform: 'translateY(1000%)'
        })),
        transition('* => complete', [
          animate('200ms ease-in')
        ]),     
        transition('* => remove', [
            animate('200ms ease-in')
        ]),  
        transition('* => removeAll', [
            animate('200ms ease-in')
        ]), 
        transition(':enter', [
            style({opacity: '0'}),
            animate('150ms ease-in', style({opacity: '1'}))
        ])
      ])
]