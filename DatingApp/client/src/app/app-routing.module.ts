import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { listeners } from 'process';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'members', //localhost:4200/members
    component: MemberListComponent
  },
  {
    path:'members/:id', //localhost:4200/members/4
    component: MemberDetailComponent
  },
  {
    path: 'lists',
    component: ListComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: '**', //localhost:4200/non-existing-route
    pathMatch:'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
