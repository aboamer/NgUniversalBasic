import { Component, OnInit } from '@angular/core';
import { CallRestService } from './../../services/call-rest.service';
import { NotificationService } from '../../services/notification.service';
import { Constants } from '../../shared/constants';
import { HeaderTitleService } from './../../services/header-title.service';
import { Title } from '@angular/platform-browser';
import { Alert } from '../../models/alert';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css']
})
export class SearchComponent implements OnInit {

   alert = new Alert();
   alertList: Alert[];
   showClear: boolean;

  constructor(
    private titleService: Title,
    private notifyService: NotificationService,
    private headerTitle: HeaderTitleService,
    private searchService: CallRestService) {
    this.titleService.setTitle('Alert Auto Job | Search');
    this.headerTitle.sendMessage('Search');
  }

  ngOnInit() {
    this.showClear = false;
  }


  onSearchAlert(alert: Alert) {
    console.log('Start Searching for alerts .....' + JSON.stringify(alert));
 
    this.searchService.searchAlerts(alert).subscribe(result => {

      // Handle result
      if (result.json().errorMsg) {
        this.notifyService.sendMessage('Load Alerts Failed', 'Something went wrong... \n ' + result.json().errorMsg, Constants.ERROR_NOTIFY);

      } else {
        console.log('Service return #: ' + result.json().alertList.length);

        if (result.json().alertList.length > 0) {
          this.alertList = result.json().alertList;
          this.showClear = true;
        } else {
          this.notifyService.sendMessage('Load Alerts Failed', 'No Result Found For This Critaria', Constants.WARN_NOTIFY);

        }
      }
    },
      error => {
        console.log(error);
        this.showClear = false;
        if (error.status === 0) {
          this.notifyService.sendMessage('Load Alerts Failed', 'Alert Search Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Load Alerts Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });
  }


  clearSearch() {
    this.alert = new Alert();
    this.alertList = null;
  }

  
}
