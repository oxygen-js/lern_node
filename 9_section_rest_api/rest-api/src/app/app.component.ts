import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rest-api';
  status = 'DOWN';

  private readonly _destroyed$ = new Subject();

  constructor(private _statusService: StatusService) {}

  ngOnInit(): void {
    this._statusService
      .getStatus()
      .pipe(distinctUntilChanged(), takeUntil(this._destroyed$))
      .subscribe((x) => console.log(x));
  }

  ngOnDestroy(): void {
    this._destroyed$.next("");
    this._destroyed$.complete();
  }
}
