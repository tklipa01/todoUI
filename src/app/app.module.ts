import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/tasks-list/task/task.component';
import { NewTaskComponent } from './tasks/tasks-list/new-task/new-task.component';

import { AuthService } from '../app/services/auth.service'
import { TodoApiService } from '../app/services/todo-api.service'
import { TasksGuardService } from './services/tasks-guard.service';
import { EventService } from './services/event.service';

import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    TasksComponent,
    TasksListComponent,
    TaskComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, TodoApiService, TasksGuardService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
