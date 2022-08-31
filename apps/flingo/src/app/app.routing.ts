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
                loadChildren: () =>
                    import('../../../../libs/workspace/murri/src/lib/workspace-murri.module').then(
                        (m) => m.WorkspaceMurriModule
                    )
            },
            {
                path: 'grid',
                loadChildren: () =>
                    import('../../../../libs/workspace/grid/src/lib/workspace-grid.module').then(
                        (m) => m.WorkspaceGridModule
                    )
            },
            {
                path: 'table',
                loadChildren: () =>
                    import('../../../../libs/workspace/mat-table/src/lib/workspace-mat-table.module').then(
                        (m) => m.WorkspaceMatTableModule
                    )
            },
            {
                path: 'slick',
                loadChildren: () =>
                    import('../../../../libs/workspace/slick/src/lib/workspace-slick.module').then(
                        (m) => m.WorkspaceSlickModule
                    )
            },
            {
                path: 'spinners',
                loadChildren: () =>
                    import('../../../../libs/workspace/spinners/src/lib/spinners.module').then(
                        (m) => m.WorkspaceSpinnersModule
                    )
            },
            {
                path: 'buttons',
                loadChildren: () =>
                    import('../../../../libs/workspace/buttons/src/lib/workspace-buttons.module').then(
                        (m) => m.WorkspaceButtonsModule
                    )
            },
            {
                path: 'source',
                loadChildren: () =>
                    import('../../../../libs/workspace/source/src/lib/workspace-source.module').then(
                        (m) => m.WorkspaceSourceModule
                    )
            },
            {
                path: 'donate',
                loadChildren: () =>
                    import('../../../../libs/workspace/donate/src/lib/workspace-donate.module').then(
                        (m) => m.WorkspaceDonateModule
                    )
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
