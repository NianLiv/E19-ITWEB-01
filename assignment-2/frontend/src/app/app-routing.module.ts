import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WorkoutComponent } from './workout/workout.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: SignInComponent,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: SignUpComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'workout',
    component: WorkoutComponent,
    // canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
