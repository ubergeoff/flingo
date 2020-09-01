import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickModule } from '@rooi/slick';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ShowThreeSlickComponent } from './show-three-slick.component';

describe('ShowThreeSlickComponent', () => {
    let component: ShowThreeSlickComponent;
    let fixture: ComponentFixture<ShowThreeSlickComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SlickModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatIconModule],
            declarations: [ShowThreeSlickComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowThreeSlickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
