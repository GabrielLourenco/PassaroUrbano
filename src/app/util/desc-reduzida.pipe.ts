import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
  transform(texto: string, limite: number): string {
    if (texto.length > limite) {
      texto = texto.substr(0,limite) + '…'
    }
    return texto
  }
}
