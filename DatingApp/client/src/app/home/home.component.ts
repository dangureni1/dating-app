import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;
  
  currentUser$: Observable<User | null>;

  constructor(
    private membersService: MembersService, 
    private accountService: AccountService,
    ) 
    { 
      this.currentUser$ = this.accountService.currentUser$;   
    }


  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode($event: boolean){
    this.registerMode = $event;
  }


}