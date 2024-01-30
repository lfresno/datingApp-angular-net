import { Component, OnInit, computed, inject } from '@angular/core';
import { routes } from '../../app-routing.module'
import { AccountService } from '../../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  private accountService = inject(AccountService);
  public loggedIn = computed(() => this.accountService.loggedIn());
  currentUser$ : Observable<User | null> = of(null);
  public user? : User;

  public navItems = routes
  .flat()
  .filter( route => !route.path?.includes('**'))
  .filter( route => !route.path?.includes(':'))

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }



  logout(){
    this.accountService.logout();
  }
}
