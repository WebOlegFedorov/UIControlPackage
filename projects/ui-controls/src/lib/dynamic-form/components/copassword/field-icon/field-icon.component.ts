import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-icon',
  templateUrl: './field-icon.component.html',
  styleUrls: ['./field-icon.component.scss']
})
export class FieldIconComponent implements Field, OnInit {

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
