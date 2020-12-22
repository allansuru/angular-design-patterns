import { Component, OnInit, Self, Optional, SkipSelf, Host } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../../logger.service';

@Component({
  selector: 'app-search-form-field-container',
  templateUrl: './search-form-field-container.component.html',
  styleUrls: ['./search-form-field-container.component.scss'],
  providers: [LoggerService]

})
export class SearchFormFieldContainerComponent implements OnInit {
  formControl = new FormControl(
    { value: { scope: '', query: '' }, disabled: false },
    AdvancedSearchValidetor
  );

  constructor(@Optional() @SkipSelf() private loggerService: LoggerService,
    @Host() private loggerService2: LoggerService) {
    this.loggerService.log('OI SearchFormFieldContainerComponent');
    this.loggerService2.log('OI HOST')
  }

  ngOnInit(): void { }
}

function AdvancedSearchValidetor(control: FormControl) {
  return control.value.scope !== null && control.value.query !== ''
    ? null
    : {
      validateSearch: {
        valid: true,
      },
    };
}
