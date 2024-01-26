import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersListComponent } from './shared/users-list/users-list.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NavComponent,
    LoginFormComponent,
    MatchesPageComponent,
    ListPageComponent,
    MessagesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
