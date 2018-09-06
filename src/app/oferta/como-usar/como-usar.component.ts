import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../services/ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(
    private router: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit() {
    this.router.parent.params.subscribe((params: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(params.id)
        .then( (descricao: string) => this.comoUsar = descricao)
    })
    // this.ofertasService.getComoUsarOfertaPorId(this.router.parent.snapshot.params.id)
    //   .then( (descricao: string) => this.comoUsar = descricao )
  }

}
