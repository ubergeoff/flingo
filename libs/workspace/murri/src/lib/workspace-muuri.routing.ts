import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const MuuriRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: DashboardComponent,
                data: {
                    title: 'Muuri example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Muuri' }]
                }
            }
        ]
    }
];
