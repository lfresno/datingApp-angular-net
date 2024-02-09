import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersListComponent } from './shared/users-list/users-list.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { MemberListComponent } from './members/member-list/member-list.component';
//import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './shared/lists/lists.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NavComponent,
    LoginFormComponent,
    MatchesPageComponent,
    ListPageComponent,
    MessagesPageComponent,
    HomePageComponent,
    RegisterFormComponent,
    MemberListComponent,
    //MemberDetailComponent,  Ahora es standalone (para poder usar la galería de fotos)
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot()
  ],
  providers: [
    //la opción multi: true indica que queremos añadir nuestros interceptores a los ya existentes, en lugar de sustituirlos
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
