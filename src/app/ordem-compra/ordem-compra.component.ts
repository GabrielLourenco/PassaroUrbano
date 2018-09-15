import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120) ]),
    numero:new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(10) ]),
    complemento:new FormControl(''),
    pagamento:new FormControl('', [ Validators.required ])
  })

/**
  * Formulário com reactive forms
  */

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  public confirmaCompra(): void {
    const valores = this.formulario.value
    let pedido = new Pedido(
      valores.endereco,
      valores.numero,
      valores.complemento,
      valores.pagamento
    )

    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }
}
