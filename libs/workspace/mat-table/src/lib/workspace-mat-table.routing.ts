import { Routes } from '@angular/router';
import { MatTableDemoComponent } from './components/mat-table/mat-table-demo.component';

export const MatTableRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            }
        ]
    }
];
