import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { RouteService } from './core/services/route.service';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  RouteService.withShell([
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: './+auth/auth.module#AuthModule' },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]),
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
