import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from '../services/ordem-compra.service'
import { CarrinhoService } from '../services/carrinho.service'

import { Pedido } from '../shared/pedido.model'
import { ItemCarrinho } from '../shared/item-carrinho.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []


  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120) ]),
    numero:new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(10) ]),
    complemento:new FormControl(''),
    pagamento:new FormControl('', [ Validators.required ])
  })

/**
  * Formulário com reactive forms
  */

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.itensCarrinho)
  }

  public confirmaCompra(): void {
    let carrinho = this.carrinhoService.exibirItens()
    if (carrinho.length == 0) {
      alert('Escolha pelo menos uma oferta para compra')
      return
    }
    const valores = this.formulario.value
    let pedido = new Pedido(
      valores.endereco,
      valores.numero,
      valores.complemento,
      valores.pagamento,
      carrinho
    )

    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
      this.carrinhoService.limparCarrinho()
    })
  }

  public alterarQuantidade(idItem: number, sinal: string) {
    if (sinal == '+') {
      this.carrinhoService.adicionarQuantidade(idItem)
    } else if (sinal == '-') {
      this.carrinhoService.removerQuantidade(idItem)
    }
  }
}
