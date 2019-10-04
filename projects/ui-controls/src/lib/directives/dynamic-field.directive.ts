import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Renderer2, Type,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../dynamic-form/dynamic-form.interface';
import { FormInputComponent } from '../dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from '../dynamic-form/components/form-select/form-select.component';
import { FormCheckboxComponent } from '../dynamic-form/components/form-checkbox/form-checkbox.component';
import { FieldExpirationDateComponent } from '../dynamic-form/components/copassword/field-expiration-date/field-expiration-date.component';
import { FieldIconComponent } from '../dynamic-form/components/copassword/field-icon/field-icon.component';
import { FieldMultiLineComponent } from '../dynamic-form/components/copassword/field-multi-line/field-multi-line.component';
import { FieldPasswordComponent } from '../dynamic-form/components/copassword/field-password/field-password.component';
import { FieldSingleLineComponent } from '../dynamic-form/components/copassword/field-single-line/field-single-line.component';
import { FieldTagsComponent } from '../dynamic-form/components/copassword/field-tags/field-tags.component';

const components: {[type: string]: Type<Field>} = {
  input: FormInputComponent,
  select: FormSelectComponent,
  checkbox: FormCheckboxComponent,
  expire: FieldExpirationDateComponent,
  icon: FieldIconComponent,
  multi_line: FieldMultiLineComponent,
  password: FieldPasswordComponent,
  single_line: FieldSingleLineComponent,
  tags: FieldTagsComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() group: FormGroup;
  @Input() config: FieldConfig;
  public component: ComponentRef<Field>;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.renderer.addClass(this.component.location.nativeElement, this.config.name + '-container');
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
