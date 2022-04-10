import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() memberCard: Member;
  like = false;
  user: User;
  userMember: Member;

  constructor(
    private memberService: MembersService,
    private toaster: ToastrService,
    private accountService: AccountService,
  ) 
  { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user as User;
    });    
  }

  ngOnInit(): void {
    this.loadLikes();
  }


  userlike(member: Member){
    if(this.like == true)
    {
      this.memberService.removeLike(member.username).subscribe(() =>{
        this.like = false;
        this.toaster.success(`You remove like on: ${member.knownAs}`);
      });
    }
    else
    {
      this.memberService.addLike(member.username).subscribe(() =>{
        this.like = true;
        this.toaster.success(`You liked: ${member.knownAs}`);
      });
    }
    //console.log(this.user.username);   
    //  this.memberService.updateMemberByUserName("dasda").subscribe(()=>{
        
     // });
  }


  loadLikes(){
    //this.member.photos = this.member.photos.filter(p=>p.id != photoId);
    var likedUser = this.memberCard.likedByUsers?.filter(p=>p.username == this.user.username);

   // console.log(this.memberCard.username)
   // console.log(this.memberCard)
   // console.log(likedUser);
console.log("likedUser?.length " + likedUser?.length );
    if(likedUser?.length > 0){
     this.like = true;
      }
  }
}
