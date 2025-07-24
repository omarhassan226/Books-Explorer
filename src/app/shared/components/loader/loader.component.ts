import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
loading$;
  constructor(private loaderService: LoaderService) {
  this.loading$ = this.loaderService.loading$;
  }
}
