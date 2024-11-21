import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackEndComponent } from './back-end/back-end.component';
import { DatosSqlComponent } from './datos-sql/datos-sql.component';
import { FrontEndComponent } from './front-end/front-end.component';

const routes: Routes = [
  { path: '', redirectTo: '/back-end', pathMatch: 'full' },
  { path: 'back-end', component: BackEndComponent },
  { path: 'datos-sql', component: DatosSqlComponent },
  { path: 'front-end', component: FrontEndComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
