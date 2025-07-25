import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { SharedModule } from '../../shared/shared.module';
import { BoosListComponent } from './pages/boos-list/boos-list.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksComponent,
    BoosListComponent,
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
  ],
})
export class BooksModule {}
