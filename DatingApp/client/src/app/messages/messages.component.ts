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
  container: string = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  loading: boolean = false;
  

  constructor(private memberService: MembersService, private messageService: MessageService) {
    this.userParams = this.memberService.UserParams;
  }

  ngOnInit(): void {
    this.loadMessages();
  }

    loadMessages() {
      this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(messages => {
      this.messages = messages.result;
      this.pagination = messages.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any):void {
      this.pageNumber = event.page;
      this.loadMessages();
  }
  
  deleteMessage(id:number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      // this.messages = this.messages.filter(x => x.id !== id);
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    });
  }
}

