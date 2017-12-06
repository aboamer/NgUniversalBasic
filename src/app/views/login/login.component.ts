import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CallRestService } from './../../services/call-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   user: User;
   errorMessage: string;

  constructor(
    private userService: CallRestService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router) {
    this.titleService.setTitle('Alert Auto Job | Login');
  }


  ngOnInit() {
  }

  writeErrorMessage(message) {
    this.errorMessage = message;
  }

  

  onLogin(userName, password) {
    console.log('Login button clicked , userName : ' + userName + " , Password : " + password);
    if (userName && password) {
      this.writeErrorMessage(null);
      console.log('Start perform login action');
      //call service
      this.userService.authenticateUser(userName, password).subscribe(
        result => {
          // Handle result
          console.log(result)

          this.user = result.json().user;
          console.log('API Return' + JSON.stringify(result.json()));

          if (this.user) {
            //navigate to home page
            this.router.navigate(['home'], { replaceUrl: true });
          } else {
            this.writeErrorMessage('Invalid login credintial !');
          }

        },
        error => {
          console.log(error);
          if (error.status === 0) {
            this.writeErrorMessage("Server is down...");

          } else {
            this.writeErrorMessage('Something went wrong...');
          }
        }

      );


    } else {
      this.writeErrorMessage('User Name and Password are required !');
      console.log('both required');
    }
  }


}
