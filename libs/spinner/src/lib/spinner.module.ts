import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BubbleSpinnerComponent } from './components/bubble/bubble.component';

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule],
    declarations: [SpinnerComponent, BubbleSpinnerComponent],
    exports: [SpinnerComponent, BubbleSpinnerComponent]
})
export class SpinnerModule {}
