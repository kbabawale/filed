import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, tap, take, takeUntil, toArray, filter } from 'rxjs/operators';
import { Trial } from 'src/app/Util/model';
import { NetworkService } from 'src/app/Util/Service/network.service';
import { SubSink } from 'subsink';
import * as fromTrial from '../../Store/Reducers/trials.reducer';
import * as trialActions from '../../Store/Actions/trials.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss']
})
export class TrialComponent implements OnInit, OnDestroy {

  obForm: FormGroup;
  private subs = new SubSink();

  constructor(private store: Store<any>, private formBuilder: FormBuilder, private _fb: FormBuilder, private toastr: ToastrService, private service: NetworkService) {
    this.obForm = this._fb.group({

      firstname: ['', Validators.compose([
        Validators.required, Validators.pattern(/^[\w\s-]+$/)
      ])],
      lastname: ['', Validators.compose([
        Validators.required, Validators.pattern(/^[\w\s-]+$/)
      ])],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      monthly_advertising_budget: ['', Validators.compose([
        Validators.required, Validators.pattern("^[0-9]*$")
      ])],
      phonenumber: ['', Validators.compose([
        Validators.required, Validators.minLength(10)
      ])],

    });
  }


  get h() { return this.obForm.controls }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  submitForm() {
    let obj: Trial = {
      email: this.h.email.value,
      firstname: this.h.firstname.value,
      lastname: this.h.lastname.value,
      phone_number: this.h.phonenumber.value,
      monthly_advertising_budget: this.h.monthly_advertising_budget.value
    }
    this.subs.add(
      this.service.submitData(obj)
        .pipe(
          map(res => res.data),
          take(1),
          toArray(),
          tap(x => {
            var trial: fromTrial.Trial = {
              id: this.makeid(10),
              email: x[0].email,
              firstname: x[0].firstname,
              lastname: x[0].lastname,
              phone_number: x[0].phone_number,
              monthly_advertising_budget: x[0].monthly_advertising_budget,
            }
            this.store.dispatch(new trialActions.Create(trial))
            x.length > 0 ? this.toastr.success('Info Posted') : this.toastr.error('An Error Occurred')

          })
        )
        .subscribe()
    ); //subsink
  }

}




        // tap(_ => this.toastr.show())