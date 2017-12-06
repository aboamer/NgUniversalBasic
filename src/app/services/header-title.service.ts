import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class HeaderTitleService {

    messageSource: BehaviorSubject<string> = new BehaviorSubject('');

 
    sendMessage(message: string) {
        this.messageSource.next(message );
    }
 
   
}