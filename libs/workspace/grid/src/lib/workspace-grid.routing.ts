import { Routes } from '@angular/router';
import { GridDemoComponent } from './components/grid/grid-demo.component';

export const GridRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: GridDemoComponent,
                data: {
                    title: 'Gridjs example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'Gridjs' }]
                }
            }
        ]
    }
];
