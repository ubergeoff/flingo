import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDemoComponent } from './components/spinners/button-demo.component';
import { MatCardModule } from '@angular/material/card';
import { TickButtonModule } from '@rooi/buttons';
import { RouterModule } from '@angular/router';
import { ButtonsRoutes } from './workspace-buttons.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TickButtonModule,
        RouterModule.forChild(ButtonsRoutes),
        MatButtonModule,
        MatIconModule
    ],
    declarations: [ButtonDemoComponent]
})
export class WorkspaceButtonsModule {}
