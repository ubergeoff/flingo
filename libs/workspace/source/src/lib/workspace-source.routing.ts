import { Routes } from '@angular/router';
import { SourceComponent } from './source/source.component';

export const SourceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SourceComponent,
                data: {
                    title: 'Source code',
                    urls: [{ title: 'Source code', url: '/Donate' }, { title: 'Source code' }]
                }
            }
        ]
    }
];
