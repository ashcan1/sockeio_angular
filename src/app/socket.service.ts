import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client';
const socketUrl = 'https://mst-full-stack-dev-test.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
  export class SocketService {
  socket: any;
  players$ = new BehaviorSubject<any>([])

  constructor() {
    this.socket = io(socketUrl);
   }

   listenToPlayerEvent(eventName: string) {
    this.socket.on(eventName, (data: any) => {
            this.setPlayer(data);
    });
   }

   getPlayers(): Observable<any[]> {
     return this.players$.asObservable();
   }

   setPlayer(player: any) {
     const players = this.players$.value;
     players.push(player);
     this.players$.next(players);
   }

}
