import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WorkoutSessionListComponent } from './components/workout-session-list/workout-session-list.component';
import { WorkoutSessionComponent } from './components/workout-session/workout-session.component';
import { WorkoutPlanListComponent } from './components/workout-plan-list/workout-plan-list.component';
import { WorkoutPlanComponent } from './components/workout-plan/workout-plan.component';
import { SetPlanComponent } from './components/set-plan/set-plan.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SetResultComponent } from './components/set-result/set-result.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutSessionListComponent,
    WorkoutSessionComponent,
    WorkoutPlanListComponent,
    WorkoutPlanComponent,
    SetPlanComponent,
    ExerciseListComponent,
    ExerciseComponent,
    NavigationBarComponent,
    SetResultComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'app/exercises', component: ExerciseListComponent, pathMatch: 'full' },
      { path: 'app/workout-plans', component: WorkoutPlanListComponent, pathMatch: 'full' },
      { path: 'app/workout-sessions', component: WorkoutSessionListComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
