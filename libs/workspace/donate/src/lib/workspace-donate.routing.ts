import { Routes } from '@angular/router';
import { DonateComponent } from './donate/donate.component';

export const DonateRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DonateComponent,
                data: {
                    title: 'Buy a coffee',
                    urls: [{ title: 'Buy a coffee', url: '/Donate' }, { title: 'Buy a coffee' }]
                }
            }
        ]
    }
];
