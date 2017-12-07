import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';

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

    /** Supportive Functions */
    isEmptyObject(o) {
        return Object.keys(o).every(function (x) {
            return o[x] === '' || o[x] === null;  // or just "return o[x];" for falsy values
        });
    }
}
