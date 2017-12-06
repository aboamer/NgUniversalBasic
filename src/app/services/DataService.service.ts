import { Alert } from '../models/alert';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class DataService {
    public alert: Alert;
}