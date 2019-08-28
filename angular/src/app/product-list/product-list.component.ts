import { Component, OnInit } from '@angular/core';
import {products} from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  products = products;

  constructor() { }

  ngOnInit() {
  }

  share() {
    alert('is shared!')
  }
  onNotify(e) {
    console.log(e);
  }
}
