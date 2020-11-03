import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ExerciseSetResultComponent } from './components/exercise-set-result/exercise-set-result.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PopperComponent } from './components/popper/popper.component';

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
    ExerciseSetResultComponent,
    LoginComponent,
    HomeComponent,
    PopperComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'app', component: HomeComponent, pathMatch: 'full' },
      { path: 'app/login', component: LoginComponent, pathMatch: 'full' },
      { path: 'app/exercises', component: ExerciseListComponent, pathMatch: 'full' },
      { path: 'app/workout-plans', component: WorkoutPlanListComponent, pathMatch: 'full' },
      { path: 'app/workout-sessions', component: WorkoutSessionListComponent, pathMatch: 'full' },
      { path: '**', component: LoginComponent, pathMatch: 'full' }
    ]),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
