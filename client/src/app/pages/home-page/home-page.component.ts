import { Component, computed, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  private accountService = inject(AccountService);

  registerMode : boolean = false;
  loggedIn = computed(() => this.accountService.loggedIn());


  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode( event : boolean){
    this.registerMode = event;
  }

}
