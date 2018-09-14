import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
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
  * Formulário com template forms
  */
  @ViewChild('formulario') public formulario: NgForm

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  public confirmaCompra(): void {
    let pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.pagamento
    )

    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }
}
