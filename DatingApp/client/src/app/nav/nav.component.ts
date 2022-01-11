import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/user';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
loggedIn: boolean = false;

  constructor(private AccountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout(){
    this.AccountService.logout();
    //this.loggedIn = false;
  }

  login(){
    this.AccountService.login(this.model)
    .subscribe(response =>{
      console.log(response);
      //this.loggedIn = true;
      console.log('Logged in successfuly')
    }, error => {
      console.log('Failed to login', error)
    });
  }

  getCurrentUser(){
    this.AccountService.currentUser$.subscribe((user:User | null) => {
    this.loggedIn = !!user;
    });
  }

}
