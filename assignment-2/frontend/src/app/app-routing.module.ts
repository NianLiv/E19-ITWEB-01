import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        component: SignInComponent,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: SignUpComponent,
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
