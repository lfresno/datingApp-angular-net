import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService);
  private router = inject(Router);
  @Output() cancelRegister = new EventEmitter();

  // model : any = {};
  maxDate : Date = new Date();
  validationErrors : string[] | undefined;

  public registerForm : FormGroup = this.fb.group({
    gender : ['male'],
    username : ['', [Validators.required]],
    knownAs : ['', [Validators.required]],
    dateOfBirth : ['', [Validators.required]],
    city : ['', [Validators.required]],
    country : ['', [Validators.required]],
    password : ['', [Validators.required, Validators.maxLength(8), Validators.minLength(4)]],
    confirmPassword : ['', [Validators.required, this.matchValues('password')]],

  });

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);  //para comprobar que es mayor de edad
  }

  isValidField( field : string) : boolean | null {

    // if(field == 'confirmPassword'){
    //   //passwords are not the same
    //   if(this.registerForm.controls['confirmPassword'].value != this.registerForm.controls['password'].value){
    //     return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
    //   }else{  //invalid password
    //     return this.registerForm.controls['password'].errors && this.registerForm.controls['password'].touched;
    //   }
    // }

    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  matchValues( matchTo : string) : ValidatorFn{
    return (control : AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching : true}
    }
  }


  register(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    //para guardar la fecha sin horas (solo fecha). Así lo necesita la API
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};

    this.accountService.register(values)
      .subscribe({
        next: response => {
          console.log(response);
          //this.cancel();  //cerrar form
          this.router.navigateByUrl('/members');
        },
        error: error => this.validationErrors = error
      })
  }

  cancel(){
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }

  private getDateOnly( dob : string | undefined){
    if(!dob) return;

    let theDob = new Date(dob);;

    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()))
      .toISOString().slice(0, 10);
  }
}
