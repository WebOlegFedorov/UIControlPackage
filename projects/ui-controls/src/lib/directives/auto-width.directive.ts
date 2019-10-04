import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Directive({
  selector: '[appAutoWidth]'
})
export class AutoWidthDirective implements OnInit {

  private _input: string;
  @HostBinding('style.width') public inputWidth;
  @Input('input') set value (value: any) {
    this._input = value;
    this.setWidth();
  }

  public get input () {
    return this._input;
  }

  constructor (
    private element: ElementRef,
    private readonly _settingsService: SettingsService
  ) { }

  ngOnInit () {
    setTimeout(() => {
      this.setWidth();
    });
  }

  private setWidth () {
    const element = document.getElementById('target_auto_width_directive');
    element.innerHTML = (this.input) ? this.input.split(' ').join('&nbsp;') : '';
    element.style.fontSize = this.element.nativeElement.style.fontSize;
    element.style.fontFamily = this._settingsService.settings.font;
    this.inputWidth = element.offsetWidth + 5 + 'px';
  }
}


