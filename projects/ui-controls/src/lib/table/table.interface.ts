import { IModalSettings } from '../modal/modal.interface';

export interface ITableSettingsParams {
  property: string;
  title: string;
  edit?: boolean;
}

export interface ITableSettingsLink {
  param: string;
  route: string;
}

export interface ITableSettings {
  params: ITableSettingsParams[];
  link?: ITableSettingsLink;
  dragName?: string;
  id?: number;
}

export interface ITableActions {
  function?: Function;
  icon?: string;
  switchModal?: IModalSettings;
  switchIcon?: {
    from: string,
    params: {
      key: any,
      value: string
    }[],
  };
}

export class TableSettingsParams implements ITableSettingsParams {
  public property: string;
  public title: string;
  public edit: boolean;
  constructor (data: ITableSettingsParams) {
    this.property = data.property;
    this.title = data.title;
    this.edit = data.edit;
  }
}

export class TableSettings implements ITableSettings {
  public id: number;
  public link: ITableSettingsLink;
  public params = Array<ITableSettingsParams>();
  public dragName: string;
  constructor (data: ITableSettings) {
    data.params.forEach(param => {
      this.params.push(new TableSettingsParams({
        property: param.property,
        title: param.title,
        edit: param.edit
      }));
    });

    if (this.link) {
     this.link.param = data.link.param;
     this.link.route = data.link.route;
    }

    this.dragName = data.dragName ? data.dragName : null;
    this.id = Math.floor(Math.random() * (9999999 - 1)) + 1;
  }
}
