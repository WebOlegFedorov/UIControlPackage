import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ITableActions, ITableSettings } from './table.interface';
import { ComponentInModal, IModalSettings } from '../modal/modal.interface';
import { ModalComponent } from '../modal/modal.component';
import { DragulaService } from 'ng2-dragula';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public style: any;
  @Input() data: any[];
  @Input() waiting = true;
  @Input() modal: ComponentInModal;
  @Input() options: ITableSettings;
  @Input() controlMethods: ITableActions[];
  @ViewChild(ModalComponent) private child: ModalComponent;

  constructor(
    private readonly _router: Router,
    private readonly _dragulaService: DragulaService,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {

    const group = this._dragulaService.find(this.options.dragName);
    this.style = this._settingsService.settings;

    if (group) {
      this._dragulaService.destroy(this.options.dragName);
    }

    if (this.options.dragName) {
      this._dragulaService.createGroup(this.options.dragName, {
        moves: function (el, source, handle) {
          return (handle.className === 'fas fa-arrows-alt');
        },
      });

      this._dragulaService.drop(this.options.dragName).subscribe((...data) => {
        this.events('drag', this.data);
      });
    }
  }

  /**
   * Back to prev modal
   */
  public switchModal (modal: IModalSettings): void {
    modal.showModal = true;
    this.child.closeEmmit();
  }

  /**
   * Router link method
   */
  public routerLink (route: string): void {
    this._router.navigate([route]);
  }

  /**
   *  Any events
   */
  public events (e: string, value: any) {
    this._settingsService.trigger({ event: e, data: value });
  }

  public focus (e: MouseEvent) {
    e.target['previousElementSibling'].focus();
  }
}

