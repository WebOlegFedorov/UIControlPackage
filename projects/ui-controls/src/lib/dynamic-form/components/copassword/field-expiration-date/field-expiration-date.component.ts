import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../../dynamic-form.service';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-expiration-date',
  templateUrl: './field-expiration-date.component.html',
  styleUrls: ['./field-expiration-date.component.scss']
})
export class FieldExpirationDateComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  public active: boolean;
  public inputDate: string;
  public style: any;

  constructor (
    public readonly _dynamicFormService: DynamicFormService,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.style = this._settingsService.settings;
    const value = this.group.controls[this.config.name].value;
    this.active = value !== undefined ? JSON.parse(value).enabled : false;
    this.inputDate = value !== undefined ? new Date(JSON.parse(value).date).toJSON() : null;
    this.group.get(this.config.name).valueChanges.subscribe(data => {
      console.log(data);
      this.active = data ? JSON.parse(data).enabled : false;
      this.inputDate = data ? new Date(JSON.parse(data).date).toJSON() : null;
    });
  }

  /**
   * Enable expiration
   */
  public changeExpireCheckbox (date: string) {
    const getDate = date ? new Date(date).toJSON() : new Date().toJSON();
    const value = this.group.controls[this.config.name].value;
    const enabled = value === undefined ? true : !JSON.parse(value).enabled;
    const object = {enabled: enabled, date: getDate};
    this.group.controls[this.config.name].setValue(JSON.stringify(object));
  }

  /**
   * Change expiration date
   */
  public changeExpireDate (date: string) {
    const getDate = new Date(date).toJSON();
    const value = this.group.controls[this.config.name].value;
    const enabled = value === undefined ? false : JSON.parse(value).enabled;
    const object = {enabled: enabled, date: getDate};
    this.group.controls[this.config.name].setValue(JSON.stringify(object));
  }

  /**
   * Copy value from field
   */
  public copy (field: HTMLInputElement) {
    const value = this.group.controls[this.config.name].value;
    this._dynamicFormService.copy(value, field);
  }
}

