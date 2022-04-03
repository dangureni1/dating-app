import { MessageService } from './../../services/message.service';
import { Message } from './../../models/message';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  @Input() messages: Message[];
  @Input() pagination: Pagination;
  messageContent: string;
  pageNumber:number;
  pageSize:number;

  constructor(private messageService:MessageService) { }

  ngOnInit() {
  console.log(this.pagination);
  }

  sendMessage(form:NgForm){
    this.messageService.sendMessage(this.username, this.messageContent)
    .subscribe((message) => {
      this.messages.push(message as Message);
      form.reset();
    })
  }

  pageChanged(event: any):void {
    this.pageNumber = event.page;
    this.loadMessages();
}

loadMessages() {
  this.messageService.getMessageThreadPaged(this.pageNumber, this.pageSize,this.username).subscribe(messages => {
    this.messages = messages.result;
    this.pagination = messages.pagination;
  });
}

}