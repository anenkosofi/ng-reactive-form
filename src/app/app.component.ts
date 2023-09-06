import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public projectForm!: FormGroup;
  public forbiddenProjectNames = ['Test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required], this.forbidTestName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  // forbidTestName(control: FormControl): {[key: string]: boolean} | null {
  //   if(this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return {'isNameForbidden': true};
  //   }
  //   return null;
  // }

  forbidTestName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(this.forbiddenProjectNames.indexOf(control.value) !== -1) {
          return resolve({'isNameForbidden': true});
        }
        return resolve(null);
      },1500)
    })
    return promise;
  }
}
