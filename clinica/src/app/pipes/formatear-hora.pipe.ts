import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearHora',
  standalone: true,
})
export class FormatearHoraPipe implements PipeTransform {
  transform(value: string): string {
    if (!/^\d{2}:\d{2}$/.test(value)) {
      return value;
    }

    const [hours, minutes] = value.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
