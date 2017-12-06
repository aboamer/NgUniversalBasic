import { Ftp } from './../models/ftp';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';
import { Alert } from '../models/alert';

import { AppUtils } from '../shared/app-utils';
import { utils } from 'protractor';

@Injectable()
export class CallRestService {
    reqBody = {};

    utils = new AppUtils;

    constructor(private httpObj: Http) { };



    public authenticateUser(userName, password) {
        this.reqBody = { "userName": userName, "password": password };
        return this.httpObj.post(Constants.BASE_URL + Constants.LOGIN_SERVICE_URL, this.reqBody);
    }

    /** FTP Module Services */
    public getAllFtpAccounts() {
        return this.httpObj.get(Constants.BASE_URL + Constants.FTP_LIST_SERVICE_URL);
    }

    public createFtpAccount(ftp: Ftp) {
        this.reqBody = { "alertFtp": { "name": ftp.name, "url": ftp.url, "username": ftp.username, "password": ftp.password, "internalpath": ftp.internalPath } };
        return this.httpObj.post(Constants.BASE_URL + Constants.FTP_SAVE_SERVICE_URL, this.reqBody);
    }

    public removeFtpAccount(ftp: Ftp) {
        this.reqBody = { "ftpId": ftp.ftpId };
        return this.httpObj.post(Constants.BASE_URL + Constants.FTP_DELETE_SERVICE_URL, this.reqBody);
    }

    public updateFtpAccount(ftp: Ftp) {
        this.reqBody = { "alertFtp": { "ftpId": ftp.ftpId, "name": ftp.name, "url": ftp.url, "username": ftp.username, "password": ftp.password, "internalpath": ftp.internalPath } };
        return this.httpObj.post(Constants.BASE_URL + Constants.FTP_UPDATE_SERVICE_URL, this.reqBody);
    }

    /** Alert Module Services */
    public searchAlerts(inputAlert: Alert) {
        var serviceUrl = Constants.BASE_URL + Constants.ALERT_SEARCH_SERVICE_URL;

        if (this.isEmptyObject(inputAlert)) {
            this.reqBody = {};
        } else {
            this.reqBody = {
                "searchDTO": {
                    "alertName": inputAlert.alertName, "alertType": inputAlert.alertType,
                    "fileName": inputAlert.fileName, "fileType": inputAlert.fileType,
                    "userName": inputAlert.userName, "runDate": inputAlert.runDate,
                    "schedule": inputAlert.schedule, "runningMethod": inputAlert.runningMethod
                }
            };
        }

        console.log('Call => ' + serviceUrl + " \n Body :" + JSON.stringify(this.reqBody));
        return this.httpObj.post(serviceUrl, this.reqBody);
    }

    public removeAlert(alert: Alert) {
        var serviceUrl = Constants.BASE_URL + Constants.ALERT_DELETE_SERVICE_URL;
        this.reqBody = { "alertId": alert.alertId };

        console.log('Call => ' + serviceUrl + " \n Body :" + JSON.stringify(this.reqBody));
        return this.httpObj.post(serviceUrl, this.reqBody);
    }


    public createAlert(alert: Alert) {
        var serviceUrl = Constants.BASE_URL + Constants.ALERT_SAVE_SERVICE_URL;

        this.reqBody = {
            "alert": {
                "alertName": alert.alertName, "alertType": alert.alertType, "fileName": alert.fileName, "userName": alert.userName,
                "fileType": alert.alertType, "query": alert.query, "email": alert.email, "ftpId": alert.ftpId,
                "dateFormatCols": alert.dateFormatCols, "equationCols": alert.equationCols, "hyperLinkCols": alert.hyperLinkCols,
                "levinCol": alert.levinCol, "levinPara": alert.levinPara, "runDate": alert.runDate, "schedule": alert.schedule, "runningMethod": alert.runningMethod,
                "runOnTime": alert.runOnTime, "wideCols": alert.wideCols, "wrappedCols": alert.wrappedCols
            }
        };

        console.log('Call => ' + serviceUrl + " \n Body :" + JSON.stringify(this.reqBody));
        return this.httpObj.post(serviceUrl, this.reqBody);
    }

    public updateAlert(alert: Alert) {
        var serviceUrl = Constants.BASE_URL + Constants.ALERT_UPDATE_SERVICE_URL;

        this.reqBody = {
            "alert": {
                "alertId": alert.alertId, "alertName": alert.alertName, "alertType": alert.alertType, "fileName": alert.fileName, "userName": alert.userName,
                "fileType": alert.alertType, "query": alert.query, "email": alert.email, "ftpId": alert.ftpId,
                "dateFormatCols": alert.dateFormatCols, "equationCols": alert.equationCols, "hyperLinkCols": alert.hyperLinkCols,
                "levinCol": alert.levinCol, "levinPara": alert.levinPara, "runDate": alert.runDate, "schedule": alert.schedule, "runningMethod": alert.runningMethod,
                "runOnTime": alert.runOnTime, "wideCols": alert.wideCols, "wrappedCols": alert.wrappedCols
            }
        };

        console.log('Call => ' + serviceUrl + " \n Body :" + JSON.stringify(this.reqBody));
        return this.httpObj.post(serviceUrl, this.reqBody);
    }


    public runAlert(alert: Alert) {
        var serviceUrl = Constants.BASE_URL + Constants.ALERT_RUN_SERVICE_URL + '?id=' + alert.alertId;

        console.log('Call => ' + serviceUrl);
        return this.httpObj.get(serviceUrl);
    }


    
    /** Supportive Functions */
    isEmptyObject(o) {
        return Object.keys(o).every(function (x) {
            return o[x] === '' || o[x] === null;  // or just "return o[x];" for falsy values
        });
    }
}