import { Routes } from '@angular/router';
import { SpinnerDemoComponent } from './components/spinners/spinner-demo.component';

export const SpinnersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: SpinnerDemoComponent,
                data: {
                    title: 'Spinners example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Spinners' }]
                }
            }
        ]
    }
];
