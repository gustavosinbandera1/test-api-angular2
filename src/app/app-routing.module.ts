import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CursoComponent } from './curso/curso.component';
import { NotaComponent } from './nota/nota.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'estudiantes', pathMatch: 'full'},
      { path: 'estudiantes', component: StudentListComponent},
      { path: 'cursos', component: CursoComponent},
      { path: 'notas', component: NotaComponent}
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
