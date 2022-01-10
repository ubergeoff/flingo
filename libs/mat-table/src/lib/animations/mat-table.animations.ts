import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandRowAnimation = trigger('expandRowAnimation', [
    state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed', animate('300ms ease-out'))
]);

export const rotateIcon = trigger('rotatedState', [
    state('false', style({ transform: 'rotate(0)' })),
    state('true', style({ transform: 'rotate(-180deg)' })),
    transition('true <=> false', animate('400ms ease-out'))
]);
