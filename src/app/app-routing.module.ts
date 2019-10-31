import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListoverviewComponent } from './components/listoverview/listoverview.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';


const routes: Routes = [
  {path: '', component: ListoverviewComponent},
  { path: 'detail/:name', component: DetailComponent },
  { path: 'listDetail/:id', component: ListDetailComponent},
  { path: 'addCards/:id', component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
