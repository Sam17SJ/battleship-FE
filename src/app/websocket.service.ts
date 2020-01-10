import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import { share } from "rxjs/operators"; 


Injectable()
export class WebsocketService {
  public messages: Rx.Subject<any>;
  private subject: Rx.Subject<any>;
  public ws: any;
  constructor() { }

  public connect(url: string): Rx.Subject<any> {
    if (!this.subject) {
        this.subject = this.create(url);
        
    }
    return this.subject;
}

private create(url: string): Rx.Subject<any> {
  this.ws = new WebSocket(url);
  const observable = Observable.create(
      (obs: Rx.Observer<Response>) => {
          this.ws.onmessage = obs.next.bind(obs);
          this.ws.onerror = obs.error.bind(obs);
          this.ws.onclose = obs.complete.bind(obs);
          return this.ws.close.bind(this.ws);
      });

  const observer = {
      next: (data: Object) => {
          if (this.ws.readyState === WebSocket.OPEN) {
              this.ws.send(JSON.stringify(data));
          }
      }
  };
  return Rx.Subject.create(observer, observable);
}

public close() {
  if (this.ws) {
      this.ws.close();
      this.subject = null;
  }
}
}
