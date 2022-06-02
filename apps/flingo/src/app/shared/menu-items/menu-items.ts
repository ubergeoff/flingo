import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '',
        name: 'Personal',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'muuri',
        name: 'Muuri',
        type: 'sub',
        icon: 'dashboard',
        children: [
            { state: 'dashboard1', name: 'Dashboard', type: 'link' },
            { state: 'starwars', name: 'Star Wars', type: 'link' }
        ]
    },
    {
        state: 'grid',
        name: 'Gridjs',
        type: 'sub',
        icon: 'table_chart',
        children: [{ state: 'dashboard1', name: 'Gridjs', type: 'link' }]
    },
    {
        state: 'table',
        name: 'MatTable',
        type: 'sub',
        icon: 'table_view',
        children: [
            { state: 'mat-table-full', name: 'MatTable Full', type: 'link' },
            { state: 'mat-table-search', name: 'MatTable Search', type: 'link' },
            { state: 'mat-table-filter', name: 'MatTable Filter', type: 'link' },
            { state: 'mat-table-actions', name: 'MatTable Actions', type: 'link' },
            { state: 'mat-table-sorting', name: 'MatTable Sorting', type: 'link' },
            { state: 'mat-table-expand', name: 'MatTable Expand Row', type: 'link' },
            { state: 'mat-table-row', name: 'MatTable Custom Row', type: 'link' }
        ]
    },
    {
        state: 'spinners',
        name: 'Spinners',
        type: 'sub',
        icon: 'grain',
        children: [{ state: 'dashboard1', name: 'Spinner', type: 'link' }]
    },
    {
        state: 'slick',
        name: 'Slick',
        type: 'sub',
        icon: 'view_carousel',
        children: [
            { state: 'slick1', name: 'Fixed Width', type: 'link' },
            { state: 'slick3', name: 'Variable width', type: 'link' },
            { state: 'slick2', name: 'Full screen', type: 'link' },
            { state: 'slick4', name: 'Center Mode', type: 'link' },
            { state: 'slick5', name: 'Multiple Items', type: 'link' },
            { state: 'slick6', name: 'Infinite', type: 'link' },
            { state: 'slick7', name: 'Multi-Row', type: 'link' }
            /*    { state: 'slick8', name: 'Slider Syncing', type: 'link' }*/
        ]
    },
    {
        state: 'source',
        name: 'Source code',
        type: 'link',
        icon: 'source'
    },
    {
        state: 'donate',
        name: 'Buy coffee',
        type: 'link',
        icon: 'local_cafe'
    }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
