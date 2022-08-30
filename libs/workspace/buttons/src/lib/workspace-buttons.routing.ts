import { Routes } from '@angular/router';
import { ButtonDemoComponent } from './components/spinners/button-demo.component';

export const ButtonsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: ButtonDemoComponent,
                data: {
                    title: 'Buttons example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Buttons' }]
                }
            }
        ]
    }
];
