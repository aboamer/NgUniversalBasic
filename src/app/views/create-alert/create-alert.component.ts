import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderTitleService } from './../../services/header-title.service';
import { Alert } from '../../models/alert';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { CallRestService } from './../../services/call-rest.service';
import { Constants } from '../../shared/constants';
import { DataService } from '../../services/DataService.service';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css']
})
export class CreateAlertComponent implements OnInit {

  runManual: boolean;
  updateMode: boolean;
  runMethods: string[] = ['Manual', 'Automatic'];
  alertTypes: string[] = ['DataSheets', 'Rohs', 'PCN', 'LC'];
  fileTypes: string[] = ['XLS', 'XLSX', 'CSV', 'TXT'];
  submitButtonName: string;
  alert = new Alert();


  constructor(
    private titleService: Title,
    private notifyService: NotificationService,
    private alertService: CallRestService,
    private dataService: DataService,
    private headerTitle: HeaderTitleService) {

    this.titleService.setTitle('Alert Auto Job |  Create Alert');
    this.headerTitle.sendMessage('Create Alert');

  }
  ngOnInit() {
    console.log('---> ' + this.dataService.alert);
    if (this.dataService.alert) {
      this.alert = this.dataService.alert;
      this.submitButtonName = 'Update Alert';
      this.updateMode = true;
    } else {
      this.submitButtonName = 'Save Alert';
      this.updateMode = false;

    }
  }
  onRunMethodChange(deviceValue) {
    console.log(deviceValue);
    if (deviceValue == 'Manual') {
      this.runManual = true;
    } else {
      this.runManual = false;

    }
  }

  onCreateOrUpdateAlert(alert: Alert) {

    if (this.updateMode == true) {
      this.onUpdateAlert(alert);
    } else {
      this.onCreateAlert(alert);
    }

  }

  onCreateAlert(alert: Alert) {
    console.log('Start Creation of alert...., Input is :' + JSON.stringify(alert));
    if (this.validAlert(alert)) {
      this.alertService.createAlert(alert).subscribe(result => {

        // Handle result
        if (result.json().errorMsg) {
          this.notifyService.sendMessage('Create Alert Failed', 'Something went wrong... \n ' + result.json().errorMsg, Constants.ERROR_NOTIFY);

        } else {
          console.log('Service return #: ' + JSON.stringify(result.json()));
          this.notifyService.sendMessage('Action Done', 'Alert Created Successfully', Constants.INFO_NOTIFY);
        }
      },
        error => {
          console.log(error);
          if (error.status === 0) {
            this.notifyService.sendMessage('Create Alert Failed', 'Alert Creation Service is down', Constants.WARN_NOTIFY);
          } else {
            this.notifyService.sendMessage('Create Alert Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
          }
        });

    } else {
      this.notifyService.sendMessage('Validate Input', 'Please enter value for required fields, marked with *', Constants.WARN_NOTIFY);
    }

  }

  onUpdateAlert(alert: Alert) {
    console.log('Start update of alert...., Input is :' + JSON.stringify(alert));

     if (this.validAlert(alert)) {
      this.alertService.updateAlert(alert).subscribe(result => {

        // Handle result
        if (result.json().errorMsg) {
          this.notifyService.sendMessage('Update Alert Failed', 'Something went wrong... \n ' + result.json().errorMsg, Constants.ERROR_NOTIFY);

        } else {
          console.log('Service return #: ' + JSON.stringify(result.json()));
          this.notifyService.sendMessage('Action Done', 'Alert Updated Successfully', Constants.INFO_NOTIFY);
        }
      },
        error => {
          console.log(error);
          if (error.status === 0) {
            this.notifyService.sendMessage('Update Alert Failed', 'Alert Creation Service is down', Constants.WARN_NOTIFY);
          } else {
            this.notifyService.sendMessage('Update Alert Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
          }
        });

    } else {
      this.notifyService.sendMessage('Validate Input', 'Please enter value for required fields, marked with *', Constants.WARN_NOTIFY);
    }
  }

  validAlert(alert: Alert) {
    if (alert != null && alert.alertName && alert.alertType && alert.fileName && alert.fileType && alert.email && alert.query) {
      return true;
    }
    return false;
  }

}
