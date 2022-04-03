
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  messages: Message[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  subscription: Subscription;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
    
    this.route.data.subscribe(data => {
      this.member = data['member'];
    });

    this.galleryImages = this.getImages();

    this.subscription = this.route.queryParams.subscribe((params: Params) => {
     this.selectTab(params.tab || 0);
    });
    
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];


  }

  getImages(): NgxGalleryImage[] {
    const imgUrls: NgxGalleryImage[] = [];
    for (const photo of this.member.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imgUrls;
  }

 /* loadMember() {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }*/

onTabActived(data: TabDirective){
  this.activeTab = data;
  if(this.activeTab.heading == "Messages" && this.messages.length == 0)
  {
    this.loadMessages();
  }
}

  loadMessages() {
    this.messageService.getMessageThreadPaged(this.pageNumber, this.pageSize,this.member.username).subscribe(messages => {
      this.messages = messages.result;
      this.pagination = messages.pagination;
      console.log(this.pagination);
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}