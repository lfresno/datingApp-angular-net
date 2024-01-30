import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService);
  @Output() cancelRegister = new EventEmitter();

  model : any = {};

  public registerForm : FormGroup = this.fb.group({
    username : ['', [Validators.required]],
    password : ['', [Validators.required]],

  });

  isValidField( field : string) : boolean | null {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
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
