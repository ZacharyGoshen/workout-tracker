import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WorkoutSessionListComponent } from './components/workout-session-list/workout-session-list.component';
import { WorkoutSessionComponent } from './components/workout-session/workout-session.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { WorkoutPlanListComponent } from './components/workout-plan-list/workout-plan-list.component';
import { WorkoutPlanComponent } from './components/workout-plan/workout-plan.component';
import { SetPlanComponent } from './components/set-plan/set-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutSessionListComponent,
    WorkoutSessionComponent,
    WorkoutPlanListComponent,
    WorkoutPlanComponent,
    SetPlanComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'workout-sessions', component: WorkoutSessionListComponent, pathMatch: 'full' },
      { path: 'workout-plans', component: WorkoutPlanListComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
