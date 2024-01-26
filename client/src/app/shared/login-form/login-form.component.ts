import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  public loginForm : FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  public model : any = {};
  //public loggedIn : boolean = false;

  isValidField( field : string) : boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    //si el formulario es valido, comprobamos si el login es válido. Esto se comprueba en el backend (se hace la petición)
    this.model = {
      username : this.loginForm.controls['username'].value,
      password : this.loginForm.controls['password'].value
    }

    console.log(this.model);

    this.accountService.login(this.model)
      .subscribe({
        next: response => {
          console.log(response);
          this.accountService.loggedIn.update( logged => true);
        },
        error: error => console.log(error)
      })
  }

}
