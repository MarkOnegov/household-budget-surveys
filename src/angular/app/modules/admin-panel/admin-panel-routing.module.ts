import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { HouseholdsComponent } from './components/households/households.component';
import { UpdateHouseholdComponent } from './components/households/update-household.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UpdateComponent as UpdateUserComponent } from './components/users/update/update.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: AdminPanelComponent },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/new',
        component: UpdateUserComponent,
        data: { create: true },
      },
      { path: 'users/:username', component: UpdateUserComponent },
      { path: 'households', component: HouseholdsComponent },
      { path: 'households/:household', component: UpdateHouseholdComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
