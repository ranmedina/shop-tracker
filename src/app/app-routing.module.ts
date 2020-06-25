import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

// I couldn't find a reason to use more than one component (HomeComponent), so routing ended up basically useless here
const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'prefix',
  },
  {
    path: 'list',
    component: HomeComponent,
    data: { title: 'Purchased' },
  },
  {
    path: 'received',
    component: HomeComponent,
    data: { title: 'Received' },
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
