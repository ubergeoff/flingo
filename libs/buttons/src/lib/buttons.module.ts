import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickButtonComponent } from './components/tick-button/tick-button.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatRippleModule, MatIconModule],
    declarations: [TickButtonComponent],
    exports: [TickButtonComponent]
})
export class TickButtonModule {}
