import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  element:any;

  constructor(public service: ChatService)  {
   
    this.service.loandchats().subscribe(() =>{ 
      
      setTimeout(() => {
      this.element.scrollTop = this.element.scrollHeight;
    }, 20);
    })
    // .subscribe((mensaje:any[])=>{
    //   console.log(mensaje);
      
    // })
   }
  mensaje:string;
  ngOnInit(): void {


  this.element = document.getElementById('app-mensajes');



   
  }

  sendchat(){
console.log(this.mensaje);

if(this.mensaje.length === 0){
  return;
}

this.service.addchats(this.mensaje).
then(()=> this.mensaje="")
.catch((err)=> console.error('Error al Enviar',err));

  }

}
