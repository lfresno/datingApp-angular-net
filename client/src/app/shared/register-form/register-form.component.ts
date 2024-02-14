import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService);
  @Output() cancelRegister = new EventEmitter();

  model : any = {};
  maxDate : Date = new Date();

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

    //si el formulario es valido, comprobamos si el login es válido. Esto se comprueba en el backend (se hace la petición)
    this.model = {
      username : this.registerForm.controls['username'].value,
      password : this.registerForm.controls['password'].value
    }

    this.accountService.register(this.model)
      .subscribe({
        next: response => {
          console.log(response);
          this.cancel();  //cerrar form
        },
        error: error => this.toaster.error(error.error)
      })
  }

  cancel(){
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
