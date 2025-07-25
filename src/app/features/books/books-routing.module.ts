import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/boos-list/books-list.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'show', component: BooksListComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
