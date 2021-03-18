import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickModule } from '@rooi/slick';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { InfiniteCenterSlickComponent } from './infinite-center-slick.component';

describe('InfiniteCenterSlickComponent', () => {
    let component: InfiniteCenterSlickComponent;
    let fixture: ComponentFixture<InfiniteCenterSlickComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SlickModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatIconModule],
            declarations: [InfiniteCenterSlickComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfiniteCenterSlickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
