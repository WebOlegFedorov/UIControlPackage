import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  ComponentInModal, ModalActions, ModalSettings, ModalButtonPosition, DynamicFormComponent, FieldConfig, ITableActions, ITableSettings,
  IComponentInModal, ModalButtonType, SettingsService, IModalSettings
} from 'ui-controls';
import {TableSettings} from '../../projects/ui-controls/src/lib/table/table.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('dynamicForm') private dynamicForm: DynamicFormComponent;
  public deleteCustomerBind: Function = this.deleteCustomer.bind(this);
  public changeStatusBind: Function = this.changeStatus.bind(this);
  public selectModalEventBind: Function = this.selectModalEvent.bind(this);
  public setValueBind: Function = this.setValue.bind(this);
  public tableControlMethods: ITableActions[];
  public editFormModal: IComponentInModal;
  public editFormOptions: ITableSettings;
  public formModal: IComponentInModal;
  public form: FieldConfig[];
  public table: any[];

  public justModal: IModalSettings;

  constructor (
    private readonly _settingsService: SettingsService
  ) {
    this._settingsService.settings.font = 'cursive';
  }

  ngOnInit () {

    this._settingsService.event.subscribe(data => {
      if (data.event === 'drag') {
        this.form.splice(0, 1);
        this.dynamicForm.reInit();
      }
    });

    this.justModal = new ModalSettings({
      title: 'Just title'
    });

    // ----------------- Main Form -----------------------

    this.form = [
      { type: 'input', placeholder: 'Enter', label: 'Address', name: 'address', error: 'some error', validation: [Validators.required] },
      { type: 'select', label: 'Address', value: 'test1', name: 'address2x', options: ['test1', 'tst2'] },
      { type: 'checkbox', label: 'Is deleted', name: 'isDeleted', value: true },
      { type: 'checkbox', label: 'Is deleted', name: 'isDeleted2', value: false },
      { type: 'single_line', placeholder: 'Enter', label: 'Email', name: 'email', validation: [Validators.required] },
      { type: 'icon', placeholder: 'Icon', label: 'Icon', name: 'icon' },
      { type: 'multi_line', placeholder: 'Enter', label: 'Multi line', name: 'multi_line', validation: [Validators.required], },
      { type: 'password', placeholder: 'Enter', label: 'Password', name: 'password', value: 'tstxxx', validation: [Validators.required]},
      { type: 'tags', placeholder: 'Enter', label: 'Tags', name: 'tags', validation: [Validators.required] },
      { type: 'single_line', placeholder: 'Enter', label: 'Date', name: 'date', validation: [Validators.required] },
      { type: 'expire', placeholder: 'Enter', label: 'Expire', name: 'expire', validation: [Validators.required] }
    ];

    this.table = [
      { type: 'input', label: 'Address', encrypted: true },
      { type: 'select', label: 'Address', encrypted: false },
      { type: 'checkbox', label: 'Is deleted', encrypted: true },
      { type: 'checkbox', label: 'Is deleted', encrypted: false },
      { type: 'single_line', label: 'single line', encrypted: true },
      { type: 'icon', label: 'Icon', encrypted: true},
      { type: 'multi_line', label: 'Multi line', encrypted: true },
      { type: 'password', label: 'Password', encrypted: true },
      { type: 'single_line', label: 'Date', encrypted: true },
      { type: 'expire', label: 'Expire', encrypted: false }
    ];

    this.formModal = new ComponentInModal({
      methods: [
        new ModalActions({ description: 'Template', position: ModalButtonPosition.left }),
        new ModalActions({ description: 'Set value', function: this.setValueBind }),
        new ModalActions({ description: 'Template 2', function: this.changeStatusBind, position: ModalButtonPosition.top }),
      ],
      settings: new ModalSettings({
        title: 'FormModal',
        showModal: false,
        description: 'Form modal',
        waiting: true
      })
    });

    // ---------------- Edit main form ------------------
    this.editFormOptions = new TableSettings({
      params: [
        { property: 'label', title: 'Label', edit: true },
        { property: 'type', title: 'Type', edit: false },
        { property: 'type', title: 'Type', edit: false },
        { property: 'type', title: 'Type', edit: false },
      ],
      dragName: 'drag'
    });

    this.editFormModal = new ComponentInModal({
      methods: [
        new ModalActions({
          description: 'Add',
          type: ModalButtonType.select,
          position: ModalButtonPosition.left,
          function: this.selectModalEventBind,
          selectData: [
            { name: 'Expire', value: 'expire' },
            { name: 'Icon', value: 'icon' },
            { name: 'Multi line', value: 'multi_line' },
            { name: 'Password', value: 'password' },
            { name: 'Single line', value: 'single_line' },
            { name: 'Tags', value: 'tags' },
          ]
        }),
        new ModalActions({ description: 'Back' })
      ],
      settings: new ModalSettings({
        title: 'TableModalTitle',
        showModal: false,
        description: 'Table modal description Table modal description',
        editMode: true,
        showDescription: true
      })
    });

    this.formModal.methods[0].switchModal = this.editFormModal.settings;
    this.editFormModal.methods[1].switchModal = this.formModal.settings;

    this.tableControlMethods = [
      {
        function: this.changeStatusBind,
        switchIcon: {
          from: 'encrypted',
          params: [ { key: true, value: 'far fa-square' }, { key: false, value: 'far fa-check-square' } ]
        }
      },
      {
        function: this.changeStatusBind,
        switchIcon: {
          from: 'encrypted',
          params: [ { key: true, value: 'fas fa-unlock' }, { key: false, value: 'fas fa-lock' } ]
        }
      },
      { function: this.deleteCustomerBind, icon: 'far fa-trash-alt' }
    ];
  }

  public openJustModal () {
    this.justModal.showModal = true;
  }

  public openModal () {
    this.formModal.settings.showModal = true;
  }

  public selectModalEvent (data: any) {
    if (data === 'password') {
      this.form.push(
        { type: 'password', placeholder: 'Password', label: 'Password', name: 'test_password', validation: [Validators.required] }
      );
    }
  }

  public setValue () {
    this.dynamicForm.form.controls['expire'].setValue('{"enabled":true,"date":"2018-10-13T00:00:00.000Z"}');
  }

  public deleteCustomer (param: FieldConfig, params: FieldConfig[], index: number, addParams: any[]) {
    this.form.splice(0, 1);
    // params.splice(index, 1);
  }

  public changeStatus (param1, param2, param3, param4) {
    param1.encrypted = !param1.encrypted;
  }

  public openTableModal () {
    this.editFormModal.settings.showModal = true;
  }
}
