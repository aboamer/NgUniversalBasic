import { Ftp } from './../models/ftp';

import { AsscoiatedPart } from './../models/associated-part';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';

@Injectable()
export class CallRestService {
    reqBody = {};

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
        this.reqBody = { "alertFtp": { "ftpId": ftp.ftpId,"name": ftp.name, "url": ftp.url, "username": ftp.username, "password": ftp.password, "internalpath": ftp.internalPath } };
        return this.httpObj.post(Constants.BASE_URL + Constants.FTP_UPDATE_SERVICE_URL, this.reqBody);
    }

}