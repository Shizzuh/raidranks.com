import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  constructor() {  }

  set(key, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
