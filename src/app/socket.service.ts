import { Injectable } from '@angular/core';
import { Observable, observable, Subscriber, BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client';
const socketUrl = 'https://mst-full-stack-dev-test.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  players$ = new BehaviorSubject<any[]>([])

  constructor() {
    this.socket = io(socketUrl);
   }
    
   listenToPlayerEvent(eventName: string) {
    this.socket.on(eventName, (data: any) => {
      console.log('DATA ==', data);
      this.setPlayer(data);
    });
   }

   getPlayers(): Observable<any[]> {
     return this.players$.asObservable();
   }

   setPlayer(player: any) {
     const players = this.players$.value;
     players.push(player);
     console.log('set Players ==>', players);
     this.players$.next(players);
   }

}
