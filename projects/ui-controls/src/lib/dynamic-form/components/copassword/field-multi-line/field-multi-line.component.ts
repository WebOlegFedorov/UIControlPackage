import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../../dynamic-form.service';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-multi-line',
  templateUrl: './field-multi-line.component.html',
  styleUrls: ['./field-multi-line.component.scss']
})
export class FieldMultiLineComponent implements Field, OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public style: any;

  constructor (
    public readonly _dynamicFormService: DynamicFormService,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.style = this._settingsService.settings;
  }

  /**
   * Copy value from field
   */
  public copy (field: HTMLInputElement) {
    const value = this.group.controls[this.config.name].value;
    this._dynamicFormService.copy(value, field);
  }
}
