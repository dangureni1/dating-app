import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { PaginatedResult, Pagination } from '../models/pagination';
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
 likesCache = new Map<string,PaginatedResult<Partial<Member>[]>>();

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

 
loadLikes(){
    const values = [this.predicate, this.pageNumber, this.pageSize];
    const cacheKey = Object.values(values).join('-');
    const response = this.likesCache.get(cacheKey);
    if(response) {
      this.pagination = response.pagination
      this.members = response.result;
      return;
    }

    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(members => {
    this.pagination = members.pagination,
    this.members = members.result
    this.likesCache.set(cacheKey, members)
  })
}

pageChanged(event: any) {
  this.pageNumber = event.page;
  this.loadLikes();
}

}
