import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { FullScreenSlickComponent } from './pages/full-screen-slick/full-screen-slick.component';
import { VariableWidthSlickComponent } from './pages/variabe-width-slick/variabe-width-slick.component';
import { CenterSlickComponent } from './pages/center-slick/center-slick.component';
import { SliderComponent } from './pages/fixed-width-slick/slider.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboards/dashboard1',
                pathMatch: 'full'
            },
            {
                path: 'dashboards',
                children: [
                    {
                        path: 'dashboard1',
                        component: DashboardComponent,
                        data: {
                            title: 'Muuri example',
                            urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Muuri' }]
                        }
                    },
                    {
                        path: 'slick1',
                        component: SliderComponent,
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
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
