import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  show() {
    throw new Error('Method not implemented.');
  }
  asObservable() {
    throw new Error('Method not implemented.');
  }
  next(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  // public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // constructor() { }

  // showLoader(){
  //   this.isLoading.next(true);
  //   console.log('show');
  // }
  // hideLoader(){
  //   this.isLoading.next(false);
  //   console.log('hide');
  // }

  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }


  private _isOnline = new BehaviorSubject<boolean>(false);
    public readonly online$ = this._isOnline.asObservable();
    on() {
        this._isOnline.next(true);
    }

    off() {
        this._isOnline.next(false);
    }

}
