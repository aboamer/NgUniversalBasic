import { HeaderTitleService } from './../../services/header-title.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Ftp } from '../../models/ftp';
import { CallRestService } from './../../services/call-rest.service';
import { NotificationService } from '../../services/notification.service';
import { Constants } from '../../shared/constants';


@Component({
  selector: 'app-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.css']
})
export class FtpComponent implements OnInit {

  private ftp = new Ftp;
  private ftpList: Ftp[];
  private saveOrUpdate: string;
  private save: boolean;

  constructor(
    private titleService: Title,
    private notifyService: NotificationService,
    private headerTitle: HeaderTitleService,
    private ftpService: CallRestService) {
    this.titleService.setTitle('Alert Auto Job | Ftp');
    this.headerTitle.sendMessage('Manage FTP');
  }
  ngOnInit() {
    this.loadAllFtpAccounte();
    this.saveOrUpdate = 'Create FTP';
    this.save = true;
  }

  onCreateOrUpdateFtp(ftp: Ftp) {
    if (this.save) {
      this.onCreateFtp(ftp);
    } else {
      this.onEditFtp(ftp, true);
    }
  }

  loadAllFtpAccounte() {
    console.log('Start Load all ftp accounts');
    this.ftpService.getAllFtpAccounts().subscribe(result => {
      // Handle result
      this.ftpList = result.json().ftpsList;
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          this.notifyService.sendMessage('Load FTP Failed', 'FTP Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Load FTP Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });
  }

  onCreateFtp(ftp: Ftp) {
    console.log('Start Create ftp account, input : ' + JSON.stringify(ftp));
    if (this.validFtpAccount(ftp)) {
      this.ftpService.createFtpAccount(ftp).subscribe(result => {
        // Handle result
        console.log(result.json());
        if (result.json()) {
          //check message
          if (result.json().errorMsg) {
            this.notifyService.sendMessage('Action Failed', 'Problem Occured \n' + result.json().errorMsg, Constants.ERROR_NOTIFY);
          } else {
            this.notifyService.sendMessage('Action done', 'Ftp Account Added Successfuly', Constants.SUCCESS_NOTIFY);
            this.loadAllFtpAccounte();
          }
        }
      },
        error => {
          console.log(error);
          if (error.status === 0) {
            this.notifyService.sendMessage('Load FTP Failed', 'FTP Service is down', Constants.WARN_NOTIFY);
          } else {
            this.notifyService.sendMessage('Load FTP Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
          }
        });
    } else {
      this.notifyService.sendMessage('Validate Input', 'All fields are required', Constants.WARN_NOTIFY);
    }

  }

  onDeleteFtp(ftp: Ftp) {
    console.log('Start delete ftp account, input : ' + ftp);
    this.ftpService.removeFtpAccount(ftp).subscribe(result => {
      // Handle result
      console.log(result.json());
      if (result.json()) {
        //check message
        if (result.json().errorMsg) {
          this.notifyService.sendMessage('Action Failed', 'Problem Occured \n' + result.json().errorMsg, Constants.ERROR_NOTIFY);
        } else {
          this.notifyService.sendMessage('Action Done', 'Ftp Account Removed Successfuly', Constants.SUCCESS_NOTIFY);
          this.loadAllFtpAccounte();
        }
      }
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          this.notifyService.sendMessage('Load FTP Failed', 'FTP Service is down', Constants.WARN_NOTIFY);
        } else {
          this.notifyService.sendMessage('Load FTP Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
        }
      });
  }

  onEditFtp(ftp: Ftp, performEdit: boolean) {
    console.log('Start edit ftp account , input : ' + JSON.stringify(ftp));
    //load data first
    this.ftp = ftp;
    this.saveOrUpdate = 'Update FTP';
    this.save = false;

    //perform edit action
    if (performEdit) {
      this.ftpService.updateFtpAccount(ftp).subscribe(result => {
        // Handle result
        console.log(result.json());
        if (result.json()) {
          //check message
          if (result.json().errorMsg) {
            this.notifyService.sendMessage('Action Failed', 'Problem Occured \n' + result.json().errorMsg, Constants.ERROR_NOTIFY);
          } else {
            this.notifyService.sendMessage('Action done', 'Ftp Account updated Successfuly', Constants.SUCCESS_NOTIFY);
            this.loadAllFtpAccounte();
            //change button name , clear all fields
            this.saveOrUpdate = 'Save FTP';
            this.save = true;
            this.ftp = new Ftp();
          }
        }
      },
        error => {
          console.log(error);
          if (error.status === 0) {
            this.notifyService.sendMessage('Load FTP Failed', 'FTP Service is down', Constants.WARN_NOTIFY);
          } else {
            this.notifyService.sendMessage('Load FTP Failed', 'Something went wrong...', Constants.ERROR_NOTIFY);
          }
        });
    }
  }


  validFtpAccount(ftp: Ftp) {
    //validate that all field required
    if (this.ftp.name && this.ftp.username && this.ftp.password && this.ftp.internalPath && this.ftp.url) {
      return true;
    }
    return false;

  }



}


