import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MaterialModule } from './material/material.module';
import { CreateWorkoutDialogComponent } from './workout/create-workout-dialog/create-workout-dialog.component';
import { ExerciseListComponent } from './workout/exercise/exercise-list/exercise-list.component';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { WorkoutItemComponent } from './workout/workout-item/workout-item.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent,
    WorkoutItemComponent,
    WorkoutDetailComponent,
    MainNavbarComponent,
    ExerciseListComponent,
    CreateWorkoutDialogComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateWorkoutDialogComponent]
})
export class AppModule {}
