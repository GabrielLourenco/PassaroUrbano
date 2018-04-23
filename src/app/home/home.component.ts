import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../services/ofertas.service'
import { Oferta } from '../shared/oferta.model'

/**
* Injeção de serviço: Colocar a classe no provider e instanciá-lo no constructor
*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertas().then(
      (ofertas: Oferta[]) => {
      this.ofertas = ofertas;
    }).catch((param) => {
      console.log(param)
    })
  }

}
