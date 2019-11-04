import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';

const routes: Routes = [
  {
    path: 'workout',
    component: WorkoutListComponent
  },
  {
    path: 'activities',
    component: ActivityListComponent
  },
  {
    path: 'workout/:id',
    component: WorkoutDetailComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '',
    redirectTo: '/workout',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
