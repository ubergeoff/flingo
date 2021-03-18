import { Routes } from '@angular/router';
import { FixedWidthComponent } from './components/fixed-width-slick/fixed-width.component';
import { VariableWidthSlickComponent } from './components/variabe-width-slick/variabe-width-slick.component';
import { FullScreenSlickComponent } from './components/full-screen-slick/full-screen-slick.component';
import { CenterSlickComponent } from './components/center-slick/center-slick.component';
import { ShowThreeSlickComponent } from './components/show-three-slick/show-three-slick.component';
import { InfiniteCenterSlickComponent } from './components/infinite-center-slick/infinite-center-slick.component';

export const SlickRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'slick1',
                component: FixedWidthComponent,
                data: {
                    title: 'Carousel: Fixed width',
                    urls: [{ title: 'Slick', url: '/slider1' }, { title: 'Carousel' }]
                }
            },
            {
                path: 'slick3',
                component: VariableWidthSlickComponent,
                data: {
                    title: 'Carousel: Variable width',
                    urls: [{ title: 'Slick', url: '/slider3' }, { title: 'Carousel' }]
                }
            },
            {
                path: 'slick2',
                component: FullScreenSlickComponent,
                data: {
                    title: 'Carousel: Full screen',
                    urls: [{ title: 'Slick', url: '/slider2' }, { title: 'Carousel' }]
                }
            },
            {
                path: 'slick4',
                component: CenterSlickComponent,
                data: {
                    title: 'Carousel: Center mode',
                    urls: [{ title: 'Slick', url: '/slider4' }, { title: 'Carousel' }]
                }
            },
            {
                path: 'slick5',
                component: ShowThreeSlickComponent,
                data: {
                    title: 'Carousel: Show three',
                    urls: [{ title: 'Slick', url: '/slider5' }, { title: 'Carousel' }]
                }
            },
            {
                path: 'slick6',
                component: InfiniteCenterSlickComponent,
                data: {
                    title: 'Carousel: Infinite',
                    urls: [{ title: 'Slick', url: '/slider6' }, { title: 'Carousel' }]
                }
            }
        ]
    }
];
