import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { HouseholdsComponent } from './components/households/households.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersComponent,
    HouseholdsComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    TranslateModule.forChild({ extend: true }),
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class AdminPanelModule {}
