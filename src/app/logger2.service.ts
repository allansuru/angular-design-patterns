import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { ExperimentalLoggerService } from './experimental-logger.service';

@Injectable({
  providedIn: 'root',
  useClass: ExperimentalLoggerService
})
export class Logger2Service implements Logger {

  prefix = 'root';

  constructor() { }

  log(message: string): void {
    console.log(`${this.prefix}: ${message}`);
  }
}