import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../../core/modals/book';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-boos-list',
  templateUrl: './boos-list.component.html',
  styleUrls: ['./boos-list.component.scss'],
})
export class BoosListComponent implements OnInit {
  books: IBook[] = [];
  loading = true;
  skeletonRows: number[] = new Array(5).fill(0);
  displayedColumns: string[] = [
    'title',
    'author',
    'category',
    'price',
    'description',
    'actions',
  ];

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.books = res;
        console.log('Loading books success!', res);
        this.loading = false;
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Loading failed.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
        console.log('Loading error', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Loading books request completed!');
      },
    });
  }

  openDeleteDialog(book: IBook): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete Book',
        message: `Are you sure you want to delete "${book.title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteBook(book);
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateBookComponent);

    dialogRef.afterClosed().subscribe((newBook: IBook) => {
      console.log(newBook);

      if (newBook) {
        this.bookService.createBook(newBook).subscribe({
          next: (createdBook: IBook) => {
            this.books.push(createdBook);
            this.getBooks();
            Swal.fire({
              title: 'Created!',
              text: `${createdBook.title} has been created.`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          error: () => {
            Swal.fire('Error', 'Failed to create the book.', 'error');
          },
        });
      }
    });
  }

  openEditDialog(book: IBook): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((updatedBook: IBook) => {
      if (updatedBook && updatedBook._id) {
        this.bookService.updateBook(updatedBook._id, updatedBook).subscribe({
          next: (res) => {
            const index = this.books.findIndex(
              (b) => b._id === updatedBook._id
            );
            if (index !== -1) {
              this.books[index] = updatedBook;
              this.getBooks();
              Swal.fire({
                title: 'Updated!',
                text: `${updatedBook.title} has been updated.`,
                icon: 'success',
                confirmButtonText: 'OK',
              });
            }
          },
          error: () => {
            Swal.fire('Error', 'Failed to update the book.', 'error');
          },
        });
      }
    });
  }

  deleteBook(book: IBook): void {
    if (!book._id) return;

    this.bookService.deleteBook(book._id).subscribe({
      next: () => {
        // this.books = this.books.filter((b) => b._id !== book._id);
        this.getBooks();
        Swal.fire({
          title: 'Deleted!',
          text: `"${book.title}" has been deleted.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: () => {
        Swal.fire('Error', 'Failed to delete the book.', 'error');
      },
    });
  }
}
