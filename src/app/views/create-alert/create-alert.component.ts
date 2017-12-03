import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from './../../services/header-title.service';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css']
})
export class CreateAlertComponent implements OnInit {



  constructor(private titleService: Title,private headerTitle: HeaderTitleService) {
    this.titleService.setTitle('Alert Auto Job |  Create Alert');
    this.headerTitle.sendMessage('Create Alert');
    
  }
  ngOnInit() {
  }

}
