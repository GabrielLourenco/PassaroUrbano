import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../services/ofertas.service';
import { CarrinhoService } from '../services/carrinho.service'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasServices: OfertasService,
    private carrinhoService: CarrinhoService
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
  public adicionarItemCarrinho(oferta: Oferta): void {
    this.carrinhoService.incluirItem(oferta)
    this.carrinhoService.exibirItens()
  }

}
