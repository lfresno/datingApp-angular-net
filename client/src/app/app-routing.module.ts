import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

export const routes: Routes = [
  {
    path: 'matches',
    title: 'Matches',
    component: MatchesPageComponent
  },
  {
    path: 'list',
    title: 'List',
    component: ListPageComponent
  },
  {
    path: 'messages',
    title: 'Messages',
    component: MessagesPageComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
