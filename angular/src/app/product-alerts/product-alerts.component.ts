import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.less']
})
export class ProductAlertsComponent implements OnInit {
  @Output() notify = new EventEmitter();
  @Input() product;
  msg = '哈哈';
  constructor() { }

  ngOnInit() {
  }

  clickHander() {
    this.notify.emit(this.product);
  }

}
