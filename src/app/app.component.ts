import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogComponent } from './overlay-example/dialog/dialog.component';
import { Component, OnInit, Optional, SkipSelf, Self } from '@angular/core';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Platform } from '@angular/cdk/platform';
import { map } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { Logger2Service } from './logger2.service';
import { ExperimentalLoggerService } from './experimental-logger.service';
import { LegacyLogger } from './logger.legacy';
import { APP_CONFIG, AppConfig } from './config.token';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoggerService, {
    provide: Logger2Service, useFactory: (config: AppConfig, http: HttpClient) =>
      config.experimentalEnabled
        ? new ExperimentalLoggerService(http)
        : new Logger2Service(),

    deps: [APP_CONFIG]
  }]

})
export class AppComponent implements OnInit {
  title = 'angular-cdk-lessons';
  isWideScreen$: Observable<boolean>;

  object = {
    name: null
  };

  value = 'Allan';

  constructor(
    private overly: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    public platform: Platform,
    private breakpointObserver: BreakpointObserver,
    @Self() private loggerService: LoggerService,
    private logger2: Logger2Service,

    private experimentalLogger: ExperimentalLoggerService

  ) {
    // this.loggerService.log('OI APP COMPONENT');

  }


  ngOnInit(): void {
    console.log(this.experimentalLogger)
    this.logger2.prefix = 'APP COMPONENT';
    this.logger2.log('App Component init...')

    console.log('is the same instance: ', this.logger2 === this.experimentalLogger)


    this.isWideScreen$ = this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape])
      .pipe(map(({ matches }) => matches));


  }

  convertToUppercase = (): any =>
    this.object?.name ?? this.value;


  createDialog() {
    const overlayRef = this.overly.create({
      hasBackdrop: true,
      positionStrategy: this.positionBuilder
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    const dialogPortal = new ComponentPortal(DialogComponent);
    overlayRef.attach(dialogPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
