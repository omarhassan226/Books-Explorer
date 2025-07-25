import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../../../../core/modals/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  book: IBook;

  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook
  ) {
    this.book = { ...data }; // Copy the existing book data
  }

  onSave(): void {
    this.dialogRef.close(this.book);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
