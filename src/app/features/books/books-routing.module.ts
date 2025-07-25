import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoosListComponent } from './pages/boos-list/boos-list.component';

const routes: Routes = [{ path: 'show', component: BoosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
