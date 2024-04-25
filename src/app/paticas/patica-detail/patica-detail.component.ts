import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaticasService } from '../paticas-service/paticas.service';
import { paticaSize } from '../models/paticas-size.enum';
import { GetPaticasListItemResponse } from '../models/get-paticas-list/get-paticas-list.response';

@Component({
  selector: 'app-patica-detail',
  templateUrl: './patica-detail.component.html',
  styleUrls: ['./patica-detail.component.css']
})
export class PaticaDetailComponent implements OnInit {
  response?: GetPaticasListItemResponse;
  paticaSizeEnum = paticaSize;

  constructor( private paticasService: PaticasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPaticaDetail();
  }

  getPaticaDetail(): void {
    let paticaId = this.route.snapshot.paramMap.get('id');
    if (paticaId !== null) {
      this.paticasService.getDetail(+paticaId)
        .subscribe({
          next: (response: GetPaticasListItemResponse) => {
            this.response = response;
          }
        });
    }
  }
}
