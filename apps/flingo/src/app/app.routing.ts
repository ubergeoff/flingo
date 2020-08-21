import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard 1',
                    urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard 1' }]
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
