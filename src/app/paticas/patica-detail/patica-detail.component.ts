import { Component, Input, OnInit } from '@angular/core';
import { GetPaticasListItemResponse } from '../models/get-paticas-list/get-paticas-list.response';
import { paticaSize } from '../models/paticas-size.enum';

@Component({
  selector: 'app-patica-detail',
  templateUrl: './patica-detail.component.html',
  styleUrls: ['./patica-detail.component.css']
})
export class PaticaDetailComponent implements OnInit {
  @Input() patica!: GetPaticasListItemResponse;
  paticaSizeEnum = paticaSize;
  

  constructor() { }

  ngOnInit(): void {
  }
  
}
