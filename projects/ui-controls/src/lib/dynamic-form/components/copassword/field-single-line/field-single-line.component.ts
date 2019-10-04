import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../../dynamic-form.service';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-single-line',
  templateUrl: './field-single-line.component.html',
  styleUrls: ['./field-single-line.component.scss']
})
export class FieldSingleLineComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  public hide = false;
  public style: any;

  constructor (
    public readonly _dynamicFormService: DynamicFormService,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.style = this._settingsService.settings;
  }

  /**
   * Change hide state
   */
  public switchHideState (): void {
    this.hide = !this.hide;
  }

  /**
   * Copy value from field
   */
  public copy (field: HTMLInputElement) {
    const value = this.group.controls[this.config.name].value;
    this._dynamicFormService.copy(value, field);
  }

}
