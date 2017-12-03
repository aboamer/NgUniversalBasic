import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from './../../services/header-title.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private titleService: Title,private headerTitle: HeaderTitleService) {
    this.titleService.setTitle('Alert Auto Job | Settings');
    this.headerTitle.sendMessage('Settings');
    
  }
  ngOnInit() {
  }

}
