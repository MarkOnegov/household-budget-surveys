import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseholdFormComponent } from './components/household-form/household-form.component';
import { HouseholdComponent } from './components/household/household.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    canDeactivate: [LoginGuard],
  },
  {
    path: '',
    component: MainComponent,
  },
  { path: 'household/:id', component: HouseholdComponent },
  { path: 'household/:id/form/:form', component: HouseholdFormComponent },
  {
    path: 'admin-panel',
    canActivate: [IsAdminGuard],
    canLoad: [IsAdminGuard],
    loadChildren: () =>
      import('./modules/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
