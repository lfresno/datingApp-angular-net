import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

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
          this.router.navigate(['/members']);

        },
        error: error => {
          console.log(error);
          this.toaster.error(error.error);
        }
      })
  }

}
