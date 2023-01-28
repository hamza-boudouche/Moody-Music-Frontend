// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Router } from '@angular/router'; // import router from angular router.
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  jsonInputString: string;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }

  register() {

    this.jsonInputString = {
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value,
      "email": document.getElementById('email').value

    }
    this.http.post("http://localhost:5000/user/register", this.jsonInputString, {
      reportProgress: true,
      observe: "events",
    })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("upload progress :" + Math.round(event.loaded / event.total) * 100 + "%");
        } else if (event.type === HttpEventType.Response) {
          console.log(event.body.success);
          if (event.body.success == true) {
            window.alert("vous etes connecté");
            this.route.navigate(['/login/']); // navigate to other page.
          }
        }
      });

  }
}
