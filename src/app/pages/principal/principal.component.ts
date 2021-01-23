import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  isCollapsed = true;
  status = 'ONLINE';
  isConnected = true;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }

  ngOnInit(): void {}
}
