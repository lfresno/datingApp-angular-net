import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/member';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{

  private membersService = inject(MembersService);

  //observable
  members$ : Observable<Member[]> | undefined;

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }

  // loadMembers() {
  //   this.membersService.getMembers()
  //     .subscribe({
  //       next: result => this.members = result
  //     })
  // }

}
