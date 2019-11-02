import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';


const routes: Routes = [
  {
    path: 'workout',
    component: WorkoutListComponent,
    children: [
      
    ],
  },
  {
    path: 'workout/:id',
    component: WorkoutDetailComponent,
  },
  {
    path: '',
    redirectTo: '/workout',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
