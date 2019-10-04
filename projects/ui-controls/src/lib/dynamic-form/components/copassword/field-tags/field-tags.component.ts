import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-tags',
  templateUrl: './field-tags.component.html',
  styleUrls: ['./field-tags.component.scss']
})
export class FieldTagsComponent implements Field, OnInit {

  public value: string[];
  public config: FieldConfig;
  public group: FormGroup;
  public style: any;

  constructor (
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.value = this.config.value ? this.config.value : Array<string>();
    this.style = this._settingsService.settings;
  }

  public add (item: HTMLInputElement) {
    const data = this.value ? this.value : Array();
    data.push(item.value);
    this.group.controls[this.config.name].setValue(data);
    item.value = '';
  }

  public remove (item: string) {
    if (this.value) {
      const index = this.value.indexOf(item);
      this.value.splice(index, 1);
      this.group.controls[this.config.name].setValue(this.value);
    }
  }
}
