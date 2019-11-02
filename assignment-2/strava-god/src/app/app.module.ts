import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { WorkoutItemComponent } from './workout/workout-item/workout-item.component';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { ExerciseListComponent } from './workout/exercise/exercise-list/exercise-list.component';
import { CreateWorkoutDialogComponent } from './workout/create-workout-dialog/create-workout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent,
    WorkoutItemComponent,
    WorkoutDetailComponent,
    MainNavbarComponent,
    ExerciseListComponent,
    CreateWorkoutDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateWorkoutDialogComponent]
})
export class AppModule { }
