import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTrial from '../app/Store/Reducers/trials.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Filed Assessment';
  store$: any;

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    this.store$ = this.store.select(fromTrial.selectAll);
  }

}
