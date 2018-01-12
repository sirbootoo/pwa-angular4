import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PostService {

  private messageSource = new BehaviorSubject<any>("default message");
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  
  changeMessage(message: any) {
    this.messageSource.next(message)
  }

}
