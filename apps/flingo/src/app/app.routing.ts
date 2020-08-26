import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { SliderComponent } from './pages/slider/slider.component';
import { FullScreenSlickComponent } from './pages/full-screen-slick/full-screen-slick.component';

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
                            title: 'Carousel example 1',
                            urls: [{ title: 'Slick', url: '/slider1' }, { title: 'Carousel' }]
                        }
                    },
                    {
                        path: 'slick2',
                        component: FullScreenSlickComponent,
                        data: {
                            title: 'Carousel example 2',
                            urls: [{ title: 'Slick', url: '/slider2' }, { title: 'Carousel' }]
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
