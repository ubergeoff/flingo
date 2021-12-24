import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickModule } from '@rooi/slick';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CenterSlickComponent } from './center-slick.component';

describe('CenterSlickComponent', () => {
    let component: CenterSlickComponent;
    let fixture: ComponentFixture<CenterSlickComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SlickModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatIconModule],
            declarations: [CenterSlickComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CenterSlickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
