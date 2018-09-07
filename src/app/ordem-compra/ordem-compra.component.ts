import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../services/ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra: number
  /**
    * Form com Two-way binding
    */
  // pristine == estado primitivo
  public endereco: any = {value: '', valid: false, pristine: true}
  public numero: any = {value: '', valid: false, pristine: true}
  public complemento: any = {value: '', valid: false, pristine: true}
  public formaPagamento: any = {value: '', valid: false, pristine: true}

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco.value = endereco
    this.endereco.pristine = false
    endereco.length > 3 ? this.endereco.valid = true : this.endereco.valid = false
  }
  public atualizaNumero(numero: string): void {
    this.numero.value = numero
    this.numero.pristine = false
    parseInt(numero) > 0 ? this.numero.valid = true : this.numero.valid = false

  }

  public atualizaComplemento(comp: string): void {
    this.complemento.value = comp
    this.complemento.pristine = false
    comp.length > 3 ? this.complemento.valid = true : this.complemento.valid = false

  }

  public atualizaFormaPagto(forma: string): void {
    this.formaPagamento.value = forma
    this.formaPagamento.pristine = false
    forma != "" ? this.formaPagamento.valid = true : this.formaPagamento.valid = false
  }

  public confirmarCompra(): void {
    let pedido = new Pedido(
      this.endereco.value,
      this.numero.value,
      this.complemento.value,
      this.formaPagamento.value
    )
    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }

}
