import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBook } from '../../../../core/modals/book';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-boos-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  books: IBook[] = [];
  loading = true;
  skeletonRows: number[] = new Array(5).fill(0);
  searchControl = new FormControl('');
  hasFocused: any = false;
  priceSortOrder: 'asc' | 'desc' | '' = '';
  displayedColumns: string[] = [
    'title',
    'author',
    'category',
    'price',
    'description',
    'actions',
  ];

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.setupSearch();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
      this.hasFocused = true;
    }, 0);
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
      console.log(updatedBook);

      if (updatedBook._id) {
        this.bookService.updateBook(updatedBook._id, updatedBook).subscribe({
          next: (res) => {
            console.log(res);

            const index = this.books.findIndex((b) => b._id == updatedBook._id);
            console.log(index);

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

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((value): value is string => value !== null),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          const trimmed = searchTerm?.trim();
          if (trimmed) {
            this.loading = true;
            return this.bookService.searchBooks(trimmed);
          } else {
            return this.bookService.getBooks();
          }
        })
      )
      .subscribe({
        next: (res: any) => {
          this.books = res;
          this.loading = false;
        },
        error: () => {
          this.books = [];
          this.loading = false;
        },
      });
  }

  sortBooks(): void {
    if (this.priceSortOrder === 'asc') {
      this.books = [...this.books].sort((a, b) => a.price - b.price);
    } else if (this.priceSortOrder === 'desc') {
      this.books = [...this.books].sort((a, b) => b.price - a.price);
    } else {
      this.getBooks();
    }
  }

  logout() {
    this.authService.logout();
  }
}
