import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  isCollapsed = true;
  status = 'ONLINE';
  isConnected = true;
  ruta = '/main';
  constructor(private connectionService: ConnectionService, private router: Router) {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }

  ngOnInit(): void { }
}
