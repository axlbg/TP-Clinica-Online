import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permiso',
  standalone: true,
})
export class PermisoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Permitido' : 'Denegado';
  }
}
