import { FormGroup } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
}

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  inputType?: string;
  error?: string;
}
