import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../services/ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(
    private router: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit() {
    this.router.parent.params.subscribe((params: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(params.id)
        .then( (descricao: string) => this.ondeFica = descricao)
    })
    // this.ofertasService.getOndeFicaOfertaPorId(this.router.parent.snapshot.params.id)
    //   .then( (descricao: string) => this.ondeFica = descricao)
  }

}
