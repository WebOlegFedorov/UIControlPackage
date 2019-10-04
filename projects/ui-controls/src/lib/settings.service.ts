import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {

  private obs = [];
  public event = Observable.create(observer => {
    this.obs.push(observer);
  });
  public settings = {
    font: 'Arial'
  };

  public trigger(sth) {
    this.obs.forEach(ob => ob.next(sth));
  }
}
