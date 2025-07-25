import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { SharedModule } from '../../shared/shared.module';
import { BooksListComponent } from './pages/boos-list/books-list.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    CreateBookComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NotFoundComponent,
  ],
})
export class BooksModule {}
