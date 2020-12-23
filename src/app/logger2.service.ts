import { Injectable } from '@angular/core';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class Logger2Service implements Logger {

  prefix = 'root';

  constructor() { }

  log(message: string): void {
    console.log(`${this.prefix}: ${message}`);
  }
}