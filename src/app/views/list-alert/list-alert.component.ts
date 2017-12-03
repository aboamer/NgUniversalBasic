import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from './../../services/header-title.service';


@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.css']
})
export class ListAlertComponent implements OnInit {

  constructor(private titleService: Title,private headerTitle: HeaderTitleService) {
    this.titleService.setTitle('Alert Auto Job |  Manage Alert');
    this.headerTitle.sendMessage('Manage Alert');
    
  }

  ngOnInit() {
  }

}
