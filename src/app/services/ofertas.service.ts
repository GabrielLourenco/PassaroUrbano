import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'

// lib para converter observable para promise
import 'rxjs/add/operator/toPromise'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

import { URL_OFERTAS, URL_COMO_USAR, URL_ONDE_FICA } from '../app.api'

import { Oferta } from '../shared/oferta.model'

@Injectable()
export class OfertasService {

  constructor(private http: Http) {}

  /*public getOfertasPromise(): Promise<Oferta[]> {
    return new Promise((resolve, reject) => {
      if(false == false) {
        setTimeout(() => resolve(this.ofertas), 3000)
      } else {
        reject({erro: 404, mensagem:'deu pt'})
      }
    })
  }*/

  public getOfertas(): Promise<Oferta[]> {
    return this.http.get(`${URL_OFERTAS}?destaque=true`)
      .toPromise()
      .then( (resposta: Response) => resposta.json() )
  }

  public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
    return this.http.get(`${URL_OFERTAS}?categoria=${categoria}`)
      .toPromise()
      .then( (resposta: Response) => resposta.json() )
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_OFERTAS}?id=${id}`)
      .toPromise()
      .then( (resposta: Response) => { return resposta.json()[0] } )
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_COMO_USAR}?id=${id}`)
      .toPromise()
      .then( (resposta: Response) => resposta.json()[0].descricao )
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_ONDE_FICA}?id=${id}`)
      .toPromise()
      .then( (resposta: Response) => resposta.json()[0].descricao )
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_OFERTAS}?descricao_oferta_like=${termo}`)
      .retry(5) //efetuar tentativas de novas conexões
      .map( (resposta: Response) => resposta.json() )
  }
}
