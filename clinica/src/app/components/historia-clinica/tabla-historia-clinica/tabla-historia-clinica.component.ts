import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VerComentarioComponent } from '../../turnos/ver-comentario/ver-comentario.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ZoomDirective } from '../../../directives/zoom.directive';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-tabla-historia-clinica',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    VerComentarioComponent,
    NgIf,
    ZoomDirective,
    LoadingComponent,
  ],
  templateUrl: './tabla-historia-clinica.component.html',
  styleUrl: './tabla-historia-clinica.component.css',
})
export class TablaHistoriaClinicaComponent {
  @Input() historiaClinica: any;
  @Input() verResenia: boolean = false;
  @Input() descarga: boolean = false;

  historiaClinicaFiltrada: any;

  showVerInforme: boolean = false;
  comentarioAMostrar: string = '';

  listOfKeys = [
    'temperatura',
    'presion',
    'especialista',
    'especialidad',
    'altura',
    'peso',
    'fecha',
    'informe',
  ];

  constructor() {}

  objectKeys = Object.keys;

  accionVerInforme(comentario: string) {
    this.comentarioAMostrar = comentario;
    this.showVerInforme = true;
  }
  ocultarTodo() {
    this.showVerInforme = false;
  }

  listaEspecialistas() {
    return [...new Set(this.historiaClinica.map((hc: any) => hc.especialista))];
  }

  filtrarPorEspecialista(especialista: string) {
    if (especialista === '') {
      this.historiaClinicaFiltrada = [...this.historiaClinica];
    } else {
      this.historiaClinicaFiltrada = this.historiaClinica.filter(
        (hc: any) => hc.especialista === especialista
      );
    }
  }
  descargarTablaComoPDF() {
    const doc = new jsPDF();

    const logo =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sol_de_Mayo_Bandera_Argentina.png/1200px-Sol_de_Mayo_Bandera_Argentina.png';
    const fechaEmision = new Date().toLocaleDateString();

    doc.addImage(logo, 'PNG', 10, 10, 22, 22);
    doc.setFontSize(10);

    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 10;
    doc.text(
      `Fecha de emisión: ${fechaEmision}`,
      200 - marginBottom,
      pageHeight - marginBottom,
      {
        align: 'right',
      }
    );

    doc.setFontSize(20);
    doc.text('Historia Clínica', 80, 20);

    const body = this.historiaClinicaFiltrada.map((hc: any) => [
      hc.fecha.toDate().toLocaleDateString(),
      hc.especialidad,
      hc.especialista,
      hc.altura,
      hc.peso,
      hc.presion,
      hc.temperatura,
      this.objectKeys(hc)
        .filter((key) => !this.listOfKeys.includes(key))
        .map((key) => `${key}: ${hc[key]}`)
        .join(', '),
    ]);

    const head = [
      [
        'Fecha',
        'Especialidad',
        'Especialista',
        'Altura',
        'Peso',
        'Presión',
        'Temperatura',
        'Otros datos',
      ],
    ].filter(Boolean);

    autoTable(doc, {
      head,
      body,
      startY: 50,
    });

    doc.save('historia clinica.pdf');
  }
}
