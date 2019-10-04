import { Component, DoCheck, Input, IterableDiffers, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from './dynamic-form.interface';
import { ComponentInModal } from '../modal/modal.interface';
import { DynamicFormService } from './dynamic-form.service';
import { SettingsService } from '../settings.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, DoCheck {
  @Input() waiting: boolean;
  @Input() modal: ComponentInModal;
  @Input() config = Array<FieldConfig>();
  private iterableDiffer: any;
  public form: FormGroup;

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _settingsService: SettingsService,
    private readonly _iterableDiffers: IterableDiffers,
    public readonly _dynamicFormService: DynamicFormService,
  ) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit () {
    this.form = this._fb.group({});
    this.form.valueChanges.subscribe((data) => this.events('form_changes', data));
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.config);
    if (changes) {
      this.reInit();
    }
  }

  /**
   * Init fields
   */
  private init () {
    if (this.form) {
      this.config.forEach(data => {
        if (data.type === 'password') {
          const confirmName = data.name + '_confirm';
          this.form.addControl(confirmName, this.createControl({ name: confirmName, type: 'input', value: data.value}));
        }
        this.form.addControl(data.name, this.createControl(data));
      });
    }
  }

  /**
   * Reinit fields
   */
  public reInit () {
    this.removeControls();
    this.init();
  }

  /**
   * Create control field
   */
  public createControl (config: FieldConfig): any {
    const { disabled, validation, value, type, name } = config;
    if (type === 'password') {
      const confirmName = config.name + '_confirm';
      validation.push(this._dynamicFormService.matchOtherValidator(confirmName));
    }
    return this._fb.control({ disabled, value }, validation);
  }

  /**
   * Remove controls
   */
  private removeControls () {
    Object.keys(this.form.controls).forEach(control => {
      this.form.removeControl(control);
    });
  }

  /**
   * Set field value
   */
  public setValue (params: Object): void {
    setTimeout(() => {
      Object.keys(params).forEach(key => {
        this.form.controls[key].setValue(params[key], {emitEvent: true});
      });
    });
  }

  /**
   *  Any events
   */
  public events (e: string, value: any) {
    this._settingsService.trigger({ event: e, data: value });
  }
}
