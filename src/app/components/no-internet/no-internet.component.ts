import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {
  @Input() conectado = true;
  constructor() { }

  ngOnInit(): void {
  }

}
