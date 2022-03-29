import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'sb-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  public loading: Subject<boolean>;

  constructor(private readonly _loaderService: LoaderService) {
    this.loading = this._loaderService.isLoading;
  }

}
