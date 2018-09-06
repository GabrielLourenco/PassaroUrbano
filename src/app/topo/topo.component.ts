import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Subject } from 'rxjs/subject'
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import 'rxjs/add/observable/of';
import { distinctUntilChanged } from 'rxjs/operators'
import { catchError } from 'rxjs/operators'

import { OfertasService } from '../services/ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
        debounceTime(1000), // executa a ação depois do tempo passado
        distinctUntilChanged(), //se o termo for diferente do termo anterior, ele executa uma nova requisição
        switchMap((termo: string) => {
          if (termo.trim() == '') {
            return Observable.of<Oferta[]>([])
          }
          return this.ofertasService.pesquisaOfertas(termo)
        }),
        catchError ((erro) => {
          console.log(erro)
          return Observable.of<Oferta[]>([])
        })
    );
  }

  public pesquisa(termoBusca: string): void {
    /*if (termoBusca.trim().length > 2) {
      this.ofertas = this.ofertasService.pesquisaOfertas(termoBusca)

      this.ofertas.subscribe(
        (ofertas: Oferta[]) => console.log(ofertas),
        erro => console.error('Erro status: ' + erro)
      )
    }*/
    this.subjectPesquisa.next(termoBusca)
  }

  public limpaPesquisa(): void {
    this.pesquisa('');
  }

}
