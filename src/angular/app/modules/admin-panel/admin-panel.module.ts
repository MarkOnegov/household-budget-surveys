import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { HouseholdsComponent } from './components/households/households.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UpdateComponent as UpdateUserComponent } from './components/users/update/update.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersComponent,
    HouseholdsComponent,
    LayoutComponent,
    UpdateUserComponent,
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
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class AdminPanelModule {}
