export interface IModalActions {
  functionParams?: any[];
  function?: Function;
  switchModal?: IModalSettings;
  description: string;
  active?: boolean;
  position?: ModalButtonPosition;
  type?: ModalButtonType;
  selectData?: Object[];
}

export class ModalActions implements IModalActions {
  public functionParams?: any[];
  public function?: Function;
  public switchModal?: IModalSettings;
  public description: string;
  public active?: boolean;
  public position?: ModalButtonPosition;
  public type?: ModalButtonType;
  public selectData?: Object[];
  constructor (data: IModalActions) {
    this.functionParams = data.functionParams;
    this.function = data.function;
    this.switchModal = data.switchModal;
    this.description = data.description;
    this.active = typeof(data.active) === 'boolean' ? data.active : true;
    this.position = data.position ? data.position : ModalButtonPosition.right;
    this.type = data.type ? data.type : ModalButtonType.button;
    this.selectData = data.selectData ? data.selectData : [];
  }
}

export interface IModalSettings {
  id?: number;
  title?: string;
  size?: ModalSize;
  waiting?: boolean;
  editMode?: boolean;
  showModal?: boolean;
  description?: string;
  showDescription?: boolean;
  waitingDescription?: string;
}

export class ModalSettings implements IModalSettings {
  public id: number;
  public title: string;
  public waiting: boolean;
  public editMode: boolean;
  public showModal: boolean;
  public description: string;
  public showDescription: boolean;
  public waitingDescription: string;
  public size: ModalSize;
  constructor (data?: IModalSettings) {
    this.waitingDescription = data.waitingDescription ? data.waitingDescription : 'Please wait...';
    this.showDescription = typeof data.showDescription === 'boolean' ? data.showDescription : false;
    this.id = Math.floor(Math.random() * (9999999 - 1)) + 1;
    this.editMode = data.editMode ? data.editMode : false;
    this.size = data.size ?  data.size : ModalSize.middle;
    this.waiting = data.waiting ? data.waiting : false;
    this.description = data.description;
    this.showModal = data.showModal;
    this.title = data.title;
  }
}

export interface IComponentInModal {
  methods: IModalActions[];
  settings: IModalSettings;
}

export class ComponentInModal implements IComponentInModal {
  public methods: IModalActions[];
  public settings: IModalSettings;
  constructor (data: IComponentInModal) {
    this.methods = data.methods;
    this.settings = data.settings;
  }
}

export enum ModalSize {
  low = 'low',
  middle = 'middle',
  large = 'large'
}

export enum ModalButtonPosition {
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum ModalButtonType {
  button = 'button',
  select = 'select',
}


