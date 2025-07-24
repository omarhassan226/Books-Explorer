import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { LoaderComponent } from './components/loader/loader.component';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatListModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTreeModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, LoaderComponent, ...materialModules],
  exports: [...materialModules],
})
export class SharedModule {}
