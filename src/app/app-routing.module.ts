import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { CallbackComponent } from './callback/callback.component';
import { TasksGuardService } from './services/tasks-guard.service';

const routes: Routes = [
  {path: 'tasks', component: TasksComponent, canActivate: [TasksGuardService] },
  {path: 'callback', component: CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
