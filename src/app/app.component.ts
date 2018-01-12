import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pocket News';
  public onlineOffline: boolean = navigator.onLine;

  constructor(){
    window.addEventListener('online', () => {this.onlineOffline = true});
    window.addEventListener('offline', () => {this.onlineOffline = false});
  }
}
