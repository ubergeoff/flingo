import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentConfigurationComponent } from './component/component-configuration.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentConfigurationDirective } from './directives/component-configuration.directive';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
    declarations: [ComponentConfigurationComponent, ComponentConfigurationDirective],
    exports: [ComponentConfigurationComponent, ComponentConfigurationDirective]
})
export class LibsComponentConfigurationModule {}
