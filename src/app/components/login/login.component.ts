import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: ChatService) { }

  ngOnInit(): void {
  }
  logingoogle(provider:string){

this.service.login(provider);

  }

  logintwitter(){
  console.log('twitter');
  
  }
}
