import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ZoomDirective } from '../../../directives/zoom.directive';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-logs',
  standalone: true,
  imports: [NgFor, ZoomDirective],
  templateUrl: './tabla-logs.component.html',
  styleUrl: './tabla-logs.component.css',
})
export class TablaLogsComponent {
  logs: any[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getLogs();
  }

  getLogs() {
    this.firestore
      .collection('logs')
      .valueChanges()
      .subscribe((data: any[]) => {
        this.logs = data;

        this.logs.sort((a, b) => {
          const [hourA, minuteA] = a.hora.split(':').map(Number);
          const [hourB, minuteB] = b.hora.split(':').map(Number);
          return hourA - hourB || minuteA - minuteB;
        });
      });
  }

  descargarExcelLogs() {
    if (this.logs.length > 0) {
      const formattedData = this.logs.map((log: any) => ({
        Día: log.dia,
        Hora: log.hora,
        Nombre: log.nombre,
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Logs');

      XLSX.writeFile(wb, 'logs.xlsx');
    } else {
      console.log('No hay datos para exportar');
    }
  }
}
