import { Component, Input, inject } from '@angular/core';
import { Member } from '../../models/member';
import { Observable, take } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../models/photo';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {

  private accountService = inject(AccountService)
  private toastr = inject(ToastrService);
  private memberService = inject(MembersService);

  @Input() member: Member | undefined;
  baseUrl = environment.apiUrl;
  user : User | undefined;

  constructor() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  setMainPhoto(photo : Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if(this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach( p => {
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id ) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId : number){
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if(this.member){
          this.member.photos = this.member.photos.filter( x => x.id != photoId);
        }
      }
    })
  }


  //FILE UPLOAD
  uploadService = inject(FileUploadService);

  currentFile?: File;
  message = '';
  fileInfos?: Observable<any>;


  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.message = '';
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.toastr.error('Error uploading the photo :(')
        },
        complete: () => {
          this.currentFile = undefined;
          this.toastr.success('Photo uploaded successfully!');
        },
      });
    }
  }


}
