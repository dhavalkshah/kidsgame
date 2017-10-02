import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StorageProvider {

  constructor(private nativeStorage: NativeStorage) {
    console.log('Hello StorageProvider Provider');
  }
  init() {
  }
  set(key: string, value: any) {
    return new Observable((observer) => {
      this.nativeStorage.setItem(key, value)
        .then((succ) => {
          console.log('Item saved Successfully');
          observer.next({});
        },
        (err) => {
          console.log('Failed to save the item');
          console.log(err);
          observer.next({});
        });
    });
  }
  get(key: string) {
    return new Observable((observer) => {
      this.nativeStorage.getItem(key)
        .then((data) => { observer.next(data) },
        (err) => {
          console.log('Err retrieving the data');
          console.log(err);
          observer.error(err);
        });
    })
  }
  remove(key: string) {
    return new Observable((observer) => {
      this.nativeStorage.remove(key)
        .then((succ) => {
          observer.next({});
        },
        (err) => {
          console.log('failed to remove the object');
          console.log(err);
          observer.next({});
        });
    })
  }
  removeAll() {
    return new Observable((observer) => {
      this.nativeStorage.clear()
        .then((succ) => {
          observer.next({});
        },
        (err) => {
          console.log('Failed to clear all the local storage');
          console.log(err);
          observer.next({})
        });
    })
  }

}
