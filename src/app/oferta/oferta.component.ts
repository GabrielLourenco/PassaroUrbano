import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../services/ofertas.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasServices: OfertasService
  ) {}

  ngOnInit() {
    //snapshot não funciona quando se já está na rota.
    // this.ofertasServices.getOfertaPorId(this.route.snapshot.params.id)
    // .then( (oferta: Oferta) => this.oferta = oferta );
    this.route.params.subscribe((params: Params) => {
      this.ofertasServices.getOfertaPorId(params.id)
      .then( (oferta: Oferta) => this.oferta = oferta );
    })
  }

}
