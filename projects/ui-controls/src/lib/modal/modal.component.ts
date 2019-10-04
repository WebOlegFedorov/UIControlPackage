import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IModalActions, IModalSettings } from './modal.interface';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  private _modalSettings: IModalSettings;
  @Input() data: any;
  public style: any;
  public dropdownMode = false;
  public headerSettingsIcon = false;
  @Input() modalActions = Array<IModalActions>();
  @Output() event = new EventEmitter<any>();
  @Input('modalSettings')
  set modalSettings(value: IModalSettings) {
    this._modalSettings = value;
  }
  get modalSettings(): IModalSettings {
    return this._modalSettings;
  }

  constructor (
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.modalSetParams();
  }

  ngAfterViewInit () {
    // this.handlerWarning();
  }

  /**
   * Set params for modal window on live mode
   */
  public modalSetParams () {
    this.style = this._settingsService.settings;
    this.headerSettingsIcon = this.modalActions.some(data => {
      if (data.position === 'top') {
        return true;
      }
    });
  }

  /**
   * Detect dropdown close
   */
  @HostListener('click', ['$event.target']) onClick(element): void {
    const classes = ['universal-modal__dropdown', 'fas fa-cog'];
    const find = classes.find(data => {
      if (~data.indexOf(element.className)) {
        return true;
      }
    });

    if (!find) {
      this.dropdownMode = false;
    }
  }

  /**
   * Handler warning
   */
  private handlerWarning () {
    this.modalActions.forEach(data => {
      if (!data.function || !data.switchModal) {
        throw new Error('Button "' + data.description + '" will not be displayed, please set "function" or "switchModal" property');
      }
      if (data.function && data.switchModal) {
        console.warn('Two properties specified, necessary set one, property switchModal has been removed');
        data.switchModal = null;
      }
    });
  }

  /**
   *  Any modal events
   */
  public events (e: string, value: any) {
    this._settingsService.trigger({event: e, data: value});
  }

  /**
   * Dropdown control
   */
  public controlDropdown (): void {
    this.dropdownMode = !this.dropdownMode;
  }

  /**
   * Back to prev modal
   */
  public switchModal (modal: IModalSettings): void {
    modal.showModal = true;
    this.closeEmmit();
  }

  /**
   * Focus element
   */
  public focus (element: any): void {
    element.focus();
  }

  /**
   * Close emit modal
   */
  public closeEmmit (): void {
    this.events('close', this.modalSettings);
    this.modalSettings.showModal = !this.modalSettings.showModal;
  }
}
