import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../models/member';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private fb = inject(FormBuilder);

  member : Member | undefined;
  user : User | null = null;

  myForm : FormGroup = this.fb.group({
    introduction : [''],
    lookingFor : [''],
    interests : [''],
    city : ['']
  })


  constructor() {
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => this.user = user
    // })
  }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })

    if(!this.user) return;

    this.memberService.getMemeber(this.user.username).subscribe({
      next: result =>{
        this.member = result;
        console.log(this.member);
      }
    })

    // this.loadMember();

    console.log(this.member);

    if(!this.member) return;

    this.myForm.setValue({
      introduction : `${this.member?.introduction.toString()}`,
      lookingFor : `${this.member?.lookingFor.toString()}`,
      interests : `${this.member!.interests.toString()}`,
      city : this.member!.city.toString(),

    })

    console.log(this.myForm.controls['introduction'].value);
  }


  loadMember() {
    if(!this.user) return;

    this.memberService.getMemeber(this.user.username).subscribe({
      next: result =>{
        this.member = result;
        console.log(this.member);
      }
    })
  }


}
