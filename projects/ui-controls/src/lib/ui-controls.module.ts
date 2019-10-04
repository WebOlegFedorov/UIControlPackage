import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { ModalService } from './modal/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSelectComponent } from './dynamic-form/components/form-select/form-select.component';
import { FormInputComponent } from './dynamic-form/components/form-input/form-input.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { FormCheckboxComponent } from './dynamic-form/components/form-checkbox/form-checkbox.component';
import { AutoWidthDirective } from './directives/auto-width.directive';
import { FieldExpirationDateComponent } from './dynamic-form/components/copassword/field-expiration-date/field-expiration-date.component';
import { FieldIconComponent } from './dynamic-form/components/copassword/field-icon/field-icon.component';
import { FieldMultiLineComponent } from './dynamic-form/components/copassword/field-multi-line/field-multi-line.component';
import { FieldPasswordComponent } from './dynamic-form/components/copassword/field-password/field-password.component';
import { FieldSingleLineComponent } from './dynamic-form/components/copassword/field-single-line/field-single-line.component';
import { FieldTagsComponent } from './dynamic-form/components/copassword/field-tags/field-tags.component';
import { DynamicFormService } from './dynamic-form/dynamic-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import { SettingsService } from './settings.service';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot()
  ],
  declarations: [
    TableComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    ModalComponent,
    AutoWidthDirective,
    FieldExpirationDateComponent,
    FieldIconComponent,
    FieldMultiLineComponent,
    FieldPasswordComponent,
    FieldSingleLineComponent,
    FieldTagsComponent,
    SafePipe
  ],
  providers: [
    ModalService,
    TableComponent,
    SettingsService,
    DynamicFormService
  ],
  entryComponents: [
    ModalComponent,
    TableComponent,
    FormInputComponent,
    FormSelectComponent,
    DynamicFormComponent,
    FormCheckboxComponent,
    FieldExpirationDateComponent,
    FieldIconComponent,
    FieldMultiLineComponent,
    FieldPasswordComponent,
    FieldSingleLineComponent,
    FieldTagsComponent
  ],
  exports: [
    TableComponent,
    DynamicFormComponent,
    ModalComponent
  ]
})
export class UiControlsModule {
  constructor () {
    const element = document.createElement('div');
    const input = document.createElement('input');
    element.id = 'target_auto_width_directive';
    input.id = 'target_copy_field';
    element.style.cssText = 'position: absolute; min-width: 50px; opacity: 0; z-index: -999;';
    input.style.cssText = 'position: absolute; opacity: 0; z-index: -999;';
    document.body.appendChild(element);
    document.body.appendChild(input);
  }
}
