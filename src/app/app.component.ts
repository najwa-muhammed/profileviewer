import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'githubProfileViewer';
  userName: any;
  data: any;
  spinner: boolean;
  local: any;
  errorMsg= false;


constructor(private http: HttpClient, private forms: FormsModule, private snackbar: MatSnackBar  ) { }

  search() {
    this.spinner=true;
    this.local = localStorage.getItem('this.userName');
    if (this.userName == this.local) {
      this.spinner = false;
      this.errorMsg= false;
      return JSON.parse(this.local);
    } else {
      // tslint:disable-next-line: max-line-length
      this.http.get(' https://api.github.com/users/' + this.userName + '?access_token=da44a85ff406114bb1c720aaa0d6f897eb9589d7').subscribe(response => {
        this.data = response;
        localStorage.setItem(this.userName, JSON.stringify(this.data));
        this.spinner = false;
        this.errorMsg= false;
        console.log(this.data);
      },
      err =>{
       this.errorMsg = true;
       this.data = false;
       this.spinner = false;
       this.snackbar.open(err.error.message, 'close', {
         duration: 2000,
         verticalPosition: 'top'
       });
      });
    }

  }
}

