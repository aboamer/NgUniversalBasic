import { HeaderTitleService } from './../../../services/header-title.service';
import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarTitle: any;

  subscription: Subscription;

  constructor(private headerTitle: HeaderTitleService) {
    // subscribe to home component messages
    this.subscription = this.headerTitle.messageSource.subscribe((message: string) => {
      console.log('Message: ', message); // => Hello from child 1!
      this.navbarTitle = message;
  });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
