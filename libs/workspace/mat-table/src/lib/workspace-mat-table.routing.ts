import { Routes } from '@angular/router';
import { MatTableDemoComponent } from './components/mat-table/mat-table-demo.component';
import { MatTableSearchComponent } from './components/mat-table-search/mat-table-search.component';

export const MatTableRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'mat-table-full',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Full Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-search',
                component: MatTableSearchComponent,
                data: {
                    title: 'MatTable Search Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-filter',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Filter Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-actions',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Actions Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-sorting',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Sorting Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-expand',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Expanding Row Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            },
            {
                path: 'mat-table-row',
                component: MatTableDemoComponent,
                data: {
                    title: 'MatTable Custom Row Example',
                    urls: [{ title: 'Dashboards', url: '/dashboard' }, { title: 'MatTable' }]
                }
            }
        ]
    }
];
