import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { StarWarsComponent } from './star-wars.component';
import { MuuriModule } from '@rooi/muuri';

describe('DashboardComponent', () => {
    let component: StarWarsComponent;
    let fixture: ComponentFixture<StarWarsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarWarsComponent],
            imports: [
                NoopAnimationsModule,
                LayoutModule,
                MatButtonModule,
                MatCardModule,
                MatGridListModule,
                MatIconModule,
                MatMenuModule,
                MuuriModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarWarsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
