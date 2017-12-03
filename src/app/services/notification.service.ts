import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var demo: any;

@Injectable()
export class NotificationService {


    public sendMessage(title: string, message: string, type: string) {
        demo.showNotification(title, message, type);
    }


}