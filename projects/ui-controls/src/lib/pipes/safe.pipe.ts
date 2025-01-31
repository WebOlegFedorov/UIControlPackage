import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  pure: false
})

export class SafePipe implements PipeTransform {

  constructor (
    private sanitizer: DomSanitizer
  ) { }

  transform(value: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
