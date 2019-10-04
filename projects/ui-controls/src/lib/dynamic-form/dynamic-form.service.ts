import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class DynamicFormService {

  constructor() { }

  /**
   * Password validator
   */
  public matchOtherValidator (otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate (control: FormControl) {

      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;

    };

  }

  /**
   * Copy value from field
   */
  public copy (value: string, fieldHtml: HTMLInputElement): void {
    const field = document.getElementById('target_copy_field') as HTMLInputElement;
    field.value = value;
    field.select();
    document.execCommand('copy');
    fieldHtml.select();
    document.execCommand('copy');
  }

}
