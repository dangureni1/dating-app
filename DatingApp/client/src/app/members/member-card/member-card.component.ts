import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() memberCard: Member;
  like: boolean

  constructor(
    private memberService: MembersService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  addlike(member: Member){
    this.memberService.addLike(member.username).subscribe(() =>{
      this.toaster.success(`You liked: ${member.knownAs}`);
    });
      
  }

  test(){
    return this.like = true;
  }
}
