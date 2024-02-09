import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../models/member';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  member : Member | undefined;
  user : User | null = null;
  @ViewChild('editForm') editForm : NgForm | undefined; //Se usaría si no usamos formularios reactivos

  //HACE LA FUNCIÓN DEL PREVENT UNSAVES CHANGES GUARD PERO DESDE EL NAVEGADOR
  //Se usa cuando el usuario va a salir de la página sin haber guardado
  //lo maneja el propio navegador, nosotros sólo le decimos cuando tiene que saltar
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event : any){
    if(this.myForm.dirty){
      $event.returnValue = true;
    }
  }

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

    this.loadMember();

    // this.memberService.getMemeber(this.user.username).subscribe({
    //   next: result =>{
    //     this.member = result;
    //     console.log(this.member);

    //     this.myForm.setValue({
    //       introduction : `${this.member?.introduction.toString()}`,
    //       lookingFor : `${this.member?.lookingFor.toString()}`,
    //       interests : `${this.member!.interests.toString()}`,
    //       city : this.member!.city.toString(),

    //     })

    //     console.log(this.myForm.controls['introduction'].value);
    //   }
    // })
  }


  loadMember() {
    if(!this.user) return;

    this.memberService.getMemeber(this.user.username).subscribe({
      next: result =>{
        this.member = result;
        console.log(this.member);

        this.myForm.setValue({
          introduction : `${this.member?.introduction.toString()}`,
          lookingFor : `${this.member?.lookingFor.toString()}`,
          interests : `${this.member!.interests.toString()}`,
          city : this.member!.city.toString(),

        })

        //console.log(this.myForm.controls['introduction'].value);
      }
    })
  }

  updateMember(){
    if(!this.member) return;
    if(!this.myForm) return;

    //guardamos cambios
    this.member!.introduction = this.myForm.controls['introduction'].value;
    this.member!.lookingFor = this.myForm.controls['lookingFor'].value;
    this.member!.interests = this.myForm.controls['interests'].value;
    this.member!.city = this.myForm.controls['city'].value;

    console.log(this.member);

    this.memberService.updateMember(this.member).subscribe({
      next: _ => {
        this.toastr.success('Profile updated succesfully');
        this.myForm.reset(this.member);
      },
      error: _ => this.toastr.error('Error saving changes! Please try again')
    })

  }


}
