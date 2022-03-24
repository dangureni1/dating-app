import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { Pagination } from '../models/pagination';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
members: Partial<Member>[] = [];
predicate = 'Liked';
pageNumber = 1;
pageSize = 5;
pagination: Pagination

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

loadLikes(){
  this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(members => {
    this.pagination = members.pagination,
    this.members = members.result
  })
}

pageChanged(event: any) {
  this.pageNumber = event.page;
  this.loadLikes();
}

}
