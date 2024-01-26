import { Component, computed, inject } from '@angular/core';
import { routes } from '../../app-routing.module'
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  private accountService = inject(AccountService);
  public loggedIn = computed(() => this.accountService.loggedIn());

  public navItems = routes
    .flat()
    .filter( route => !route.path?.includes('**'))


  logout(){
    this.accountService.logout();
  }
}
