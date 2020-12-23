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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoggerService, {
    provide: Logger2Service,
    useClass: ExperimentalLoggerService
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

  ) {
    // this.loggerService.log('OI APP COMPONENT');

  }


  ngOnInit(): void {

    this.logger2.prefix = 'APP COMPONENT';
    this.logger2.log('App Component init...')

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
