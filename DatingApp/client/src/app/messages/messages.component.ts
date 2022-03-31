import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Pagination } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { MembersService } from '../services/members.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userParams: UserParams;
  messages: Message[] = [];
  container: string = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  

  constructor(private memberService: MembersService, private messageService: MessageService) {
    this.userParams = this.memberService.UserParams;
  }

  ngOnInit(): void {
    this.loadMessages();
  }

    loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(messages => {
      this.messages = messages.result;
      this.pagination = messages.pagination;
    });
  }

  pageChanged(event: any):void {
      this.pageNumber = event.page;
      this.loadMessages();
  }

}

