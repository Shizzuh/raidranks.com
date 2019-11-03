import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  discord: string;

  constructor() { }

  ngOnInit() {
    this.discord = '@pwm50 #8505';
  }

}
