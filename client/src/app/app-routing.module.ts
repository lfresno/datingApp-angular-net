import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { authGuard } from './guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent
  },
  {
    path: 'members',
    title: 'Members',
    component: MemberListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'members/:username',
    title: 'Member',
    component: MemberDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'member/edit',
    title: 'Edit Member',
    component: MemberEditComponent,
    canActivate: [authGuard],
    canDeactivate: [preventUnsavedChangesGuard]
  },
  {
    path: 'list',
    title: 'List',
    component: ListPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    title: 'Messages',
    component: MessagesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'matches',
    title: 'Matches',
    component: MatchesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'errors',
    title: 'Errors',
    component: TestErrorComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
