import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoosListComponent } from './pages/boos-list/boos-list.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'show', component: BoosListComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
