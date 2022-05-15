import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: 'muuri/dashboard1',
                pathMatch: 'full'
            },
            {
                path: 'muuri',
                loadChildren: () => import('@rooi/workspace/murri').then((m) => m.WorkspaceMurriModule)
            },
            {
                path: 'grid',
                loadChildren: () => import('@rooi/workspace/grid').then((m) => m.WorkspaceGridModule)
            },
            {
                path: 'table',
                loadChildren: () => import('@rooi/workspace/mat-table').then((m) => m.WorkspaceMatTableModule)
            },
            {
                path: 'slick',
                loadChildren: () => import('@rooi/workspace/slick').then((m) => m.WorkspaceSlickModule)
            },
            {
                path: 'spinners',
                loadChildren: () => import('@rooi/workspace/spinners').then((m) => m.WorkspaceSpinnersModule)
            },
            {
                path: 'source',
                loadChildren: () => import('@rooi/workspace/source').then((m) => m.WorkspaceSourceModule)
            },
            {
                path: 'donate',
                loadChildren: () => import('@rooi/workspace/donate').then((m) => m.WorkspaceDonateModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
