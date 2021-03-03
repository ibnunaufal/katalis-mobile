import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replace"
})
export class ReplacePipe implements PipeTransform {
  transform(value: any, replace, replacement): any {
    if (value == null) return "";
    value = value.replace(new RegExp(replace, "g"), replacement);
    return value;
  }
}
