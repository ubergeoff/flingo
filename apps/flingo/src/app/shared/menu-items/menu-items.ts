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
        state: 'slick',
        name: 'Slick',
        type: 'sub',
        icon: 'view_carousel',
        children: [
            { state: 'slick1', name: 'Fixed Width', type: 'link' },
            { state: 'slick3', name: 'Variable width', type: 'link' },
            { state: 'slick2', name: 'Full screen', type: 'link' },
            { state: 'slick4', name: 'Center', type: 'link' },
            { state: 'slick5', name: 'Show three', type: 'link' }
        ]
    }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
