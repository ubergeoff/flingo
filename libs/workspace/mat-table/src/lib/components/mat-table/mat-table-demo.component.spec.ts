import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDemoComponent } from './mat-table-demo.component';
import { RooiMatTableModule } from '@rooi/mat-table';
import { ComponentConfigurationModule } from '@rooi/libs/component-configuration';
import { MatTableDemoService } from '../../services/mat-table-demo.service';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableFilterComponent } from '../filter-component/mat-table-filter.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatTableFilterModule } from '../filter-component/mat-table-filter.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableConfigComponent } from '../mat-table-config-component/mat-table-config.component';
import { MatTableConfigModule } from '../mat-table-config-component/mat-table-config.module';

describe('MatTableDemoComponent', () => {
    let component: MatTableDemoComponent;
    let fixture: ComponentFixture<MatTableDemoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RooiMatTableModule,
                ComponentConfigurationModule,
                FormsModule,
                MatCheckboxModule,
                MatTableFilterModule,
                NoopAnimationsModule,
                MatTableConfigModule
            ],
            declarations: [MatTableDemoComponent],
            providers: [MatTableDemoService]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [MatTableFilterComponent, MatTableConfigComponent]
            }
        });
        fixture = TestBed.createComponent(MatTableDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
