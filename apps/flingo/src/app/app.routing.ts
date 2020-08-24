import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { SliderComponent } from './pages/slider/slider.component';

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
                        path: 'dashboard2',
                        component: SliderComponent,
                        data: {
                            title: 'Carousel example',
                            urls: [{ title: 'Dashboards', url: '/slider' }, { title: 'Carousel' }]
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
