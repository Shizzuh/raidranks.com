import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'faq',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class FaqComponent implements OnInit {

  discord: string;

  constructor() { }

  ngOnInit() {
    this.discord = '@pwm50 #8505';
  }

}
