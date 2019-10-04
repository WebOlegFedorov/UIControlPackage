import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../../../dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../../dynamic-form.service';
import { SettingsService } from '../../../../settings.service';

@Component({
  selector: 'app-field-password',
  templateUrl: './field-password.component.html',
  styleUrls: ['./field-password.component.scss']
})
export class FieldPasswordComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  public strength = 0;
  public hide = false;
  public style: any;

  constructor (
    public readonly _dynamicFormService: DynamicFormService,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.style = this._settingsService.settings;
    this.group.controls[this.config.name].valueChanges.subscribe(data => {
      this.strength = this.checkStrength(data);
    });
  }

  /**
   * Check strength password
   */
  private checkStrength(password: string): number {
    let strength = 0;
    if (password) {
      if (password.length > 0) {
        strength++;
      }
      if (password.length > 9) {
        strength++;
      }
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength++;
      }
      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength++;
      }
      if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) {
        strength++;
      }
    }
    return strength * 20;
  }

  /**
   *  Generate password
   */
  private generatePassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*.,?~+=-_>';
    const chrs = chars.split('');
    let i = chrs.length;
    const length = 14;

    while (i > 0) {
      const random: number = Math.round(Math.random() * i);
      const tmp = chrs[--i];
      chrs[i] = chrs[random];
      chrs[random] = tmp;
    }

    return chrs.join('').substr(0, length);
  }

  /**
   * Set generated password on the fields
   */
  public setGeneratedPassword (): void {
    const password = this.generatePassword();
    this.group.controls[this.config.name].setValue(password);
    this.group.controls[this.config.name + '_confirm'].setValue(password);
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
