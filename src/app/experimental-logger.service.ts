import { Injectable } from '@angular/core';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class ExperimentalLoggerService implements Logger {

  prefix = 'root';
  constructor() { }

  log(message: string): void {
    console.log(`${this.prefix} (experimental): ${message}`);
  };
}
