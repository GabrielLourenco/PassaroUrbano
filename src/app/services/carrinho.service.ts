import { ItemCarrinho } from '../shared/item-carrinho.model'
import { Oferta } from '../shared/oferta.model'

export class CarrinhoService {
  public itens: ItemCarrinho[] = []

  public exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  public incluirItem(oferta: Oferta): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    )

    let itemEncontrado = this.itens.find((i: ItemCarrinho) => i.id === itemCarrinho.id)
    if (itemEncontrado) {
        itemEncontrado.quantidade++
    } else {
      this.itens.push(itemCarrinho)
    }
  }

  public totalCarrinho(): number {
    let total: number = 0

    this.itens.map((item: ItemCarrinho) => {
      total += item.quantidade * item.valor
    })

    return total
  }

  public adicionarQuantidade(id: number): void {
    let itemEncontrado = this.itens.find((i: ItemCarrinho) => i.id === id)
    if (itemEncontrado) {
        itemEncontrado.quantidade++
    }
  }

  public removerQuantidade(id: number): void {
    let itemEncontrado = this.itens.find((i: ItemCarrinho) => i.id === id)
    if (itemEncontrado) {
      if (itemEncontrado.quantidade > 0) {
        itemEncontrado.quantidade--
        if (itemEncontrado.quantidade == 0) {
          this.itens.splice(this.itens.indexOf(itemEncontrado), 1)
        }
      }
    }
  }

  public limparCarrinho(): void {
    this.itens = []
  }
}
