import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "asterix",
})
export class AsterixPipe implements PipeTransform {
  V: any = "aeiouy";
  transform(ch: string): string {
    let result: string = "";
    for (let i = 0; i < ch.length; i++) {
      let x = ch[i];
      for (let j = 0; j < this.V.length; j++) {
        if (ch[i].toLowerCase() == this.V[j]) {
          x = "*";
          break;
        }
      }
      result += x;
    }
    return result;
  }
}
