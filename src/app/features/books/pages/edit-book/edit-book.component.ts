import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../../../../core/modals/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      author: [this.data.author, Validators.required],
      category: [this.data.category, Validators.required],
      price: [this.data.price, [Validators.required, Validators.min(0)]],
      description: [this.data.description, Validators.required],
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedBook: IBook = {
        ...this.data,
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedBook);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
