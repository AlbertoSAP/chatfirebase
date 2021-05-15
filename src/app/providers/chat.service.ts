import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats:Mensaje[]=[];
  usuario:any = {};
  constructor( private firestore: AngularFirestore,
               public auth: AngularFireAuth) {

                this.auth.authState.subscribe(user =>{
                
                  console.log('Estado Usuario', user);
                  
                  if(!user){
                    return;
                  }
                  this.usuario.nombre = user.displayName;
                  this.usuario.uid = user.uid;
                  
                })

                }

//  auth
login(provaider:string) {
  this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
logout() {
  this.usuario ={};
  this.auth.signOut();
  console.log('sesion Terminada');
  
}
// end auth

loandchats(){
  this.itemsCollection =this.firestore.collection<Mensaje>('chats', query => query.orderBy('fecha', 'desc').limit(10));
  return this.itemsCollection.valueChanges()
   .pipe(map(
    (mensaje : Mensaje[]) => {
    console.log('servicio',mensaje);

this.chats = [];
for(let Mensaj of mensaje){
  this.chats.unshift(Mensaj);
}
return this.chats;
      // this.chats = mensaje;
    }
  ))
}

addchats( text:string){
let mensaje: Mensaje = {
  nombre: 'Alberto',
  mensaje: text,
  fecha: new Date().getTime()
}

return this.itemsCollection.add(mensaje);
}

}
