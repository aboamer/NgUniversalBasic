import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from './../../services/header-title.service';
import { CallRestService } from './../../services/call-rest.service';
import { NotificationService } from '../../services/notification.service';
import { Constants } from '../../shared/constants';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../services/DataService.service';
import { Alert } from '../../models/alert';


@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.css']
})
export class ListAlertComponent implements OnInit, OnDestroy {
  alertList: Alert[];
  alert = new Alert();



  constructor(
    private titleService: Title,
    private headerTitle: HeaderTitleService,
    private dataService: DataService,
    private notifyService: NotificationService,
    private router: Router,
    private alertService: CallRestService) {

    this.titleService.setTitle('Alert Auto Job |  Manage Alert');
    this.headerTitle.sendMessage('Manage Alert');

  }

  ngOnInit() {
    this.loadAllAlerts();

  }

  ngOnDestroy() {
    this.dataService.alert = this.alert;
  }


  loadAllAlerts() {
    console.log('Start loading alerts .....');

    this.alertService.searchAlerts(this.alert).subscribe(result => {

      // Handle result
      if (result.json().errorMsg) {
        this.notifyService.sendMessage('Load Alerts Failed', 'Something went wrong... \n ' + result.json().errorMsg, Constants.ERROR_NOTIFY);

      } else {
        console.log('Service return #: ' + result.json().alertList.length);

        if (result.json().alertList.length > 0) {
          this.alertList = result.json().alertList;
        } else {
          this.notifyService.sendMessage('Load Alerts Failed', 'No Result Found For This Critaria', Constants.WARN_NOTIFY);

        }
      }
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          this.notifyService.sendMessage('Load Alerts Failed', 'Alert Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Load Alerts Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });

  }


  onEditAlert(alert: Alert) {
    console.log('Start onEditAlert for alerts .....' + JSON.stringify(alert));
    this.alert = alert;
    this.router.navigate(['home/create-alert'], { replaceUrl: true });


  }

  onRunAlert(alert: Alert) {
    console.log('Start on Run alerts .....' + JSON.stringify(alert));

    this.alertService.runAlert(alert).subscribe(result => {
      // Handle result
      if (result.json().errorMsg) {
        this.notifyService.sendMessage('Run Alerts Failed', 'Something went wrong... \n ' + result.json().errorMsg, Constants.ERROR_NOTIFY);

      } else {
        this.notifyService.sendMessage('Action Done', 'Alert run now', Constants.INFO_NOTIFY);

      }
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          this.notifyService.sendMessage('Run Alerts Failed', 'Run Alert Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Run Alerts Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });

  }

  onDeleteAlert(alert: Alert) {
    console.log('Start onDeleteAlert for alerts .....' + JSON.stringify(alert));

    //Actual logic to perform a confirmation
    this.alertService.removeAlert(alert).subscribe(result => {
      // Handle result
      console.log(result.json());
      if (result.json()) {
        //check message
        if (result.json().errorMsg) {
          this.notifyService.sendMessage('Action Failed', 'Problem Occured \n' + result.json().errorMsg, Constants.ERROR_NOTIFY);
        } else {
          this.notifyService.sendMessage('Action Done', 'Alert Removed Successfuly', Constants.SUCCESS_NOTIFY);
        }
      }
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          this.notifyService.sendMessage('Remove Alert Failed', 'Remove Alert Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Remove Alert Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });
  }

}



