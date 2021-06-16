import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SocketService } from './socket.service';


export interface PeriodicElement {
  MSTID: number;
  Match: number;
  First: string;
  Last: string;
  Nationality: string;
}

// test delete
const ELEMENT_DATA: PeriodicElement[] = [
  {MSTID: 36867, Match: 16, First: "Jorge", Last: "Campillo", Nationality: "ESP",},
  {MSTID: 36867, Match: 16, First: "Jorge", Last: "Campillo", Nationality: "ESP",},
  {MSTID: 36867, Match: 16, First: "Jorge", Last: "Campillo", Nationality: "ESP",}



];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GolfTournament';
  displayedColumns: string[] = ['MSTID', 'Match', 'First', 'Last', 'Nationality'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
 //inject the service
  constructor(private socketService: SocketService) {}
// connect to the socket
  ngOnInit() {
    this.getPlayers();
  }
// listen to the event from service
  getPlayers() {
    this.socketService.listenToPlayerEvent('data-update');
    this.socketService.getPlayers()
      .subscribe((players: any[]) => {
        this.dataSource.data = players;
      })
  }
}
