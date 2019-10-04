import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../../dynamic-form.interface';
import { SettingsService } from '../../../settings.service';

@Component({
  selector: 'app-form-input',
  styleUrls: ['form-checkbox.component.scss'],
  templateUrl: './form-checkbox.component.html'
})
export class FormCheckboxComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  public style: any;

  constructor (
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.style = this._settingsService.settings;
  }
}
