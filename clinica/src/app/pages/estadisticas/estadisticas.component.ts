import { Component } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from 'chart.js';
import { FormsModule } from '@angular/forms';
import { TablaLogsComponent } from '../../components/logs/tabla-logs/tabla-logs.component';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [FormsModule, TablaLogsComponent],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
})
export class EstadisticasComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  showLogs = false;
  showGraficos = false;
  showTurnosPorFecha = false;

  constructor(protected turnosService: TurnoService) {
    this.obtenerTurnos();
    Chart.register(
      PieController,
      ArcElement,
      BarElement,
      BarController,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  }

  verLogs() {
    this.showLogs = !this.showLogs;
  }

  verGraficos() {
    this.showGraficos = !this.showGraficos;
  }

  obtenerTurnos(): void {
    this.turnosService.traerTodosLosTurnos().subscribe(
      (turnos) => {
        turnos.sort(
          (a: any, b: any) =>
            a.fecha.toDate().getTime() - b.fecha.toDate().getTime()
        );
        this.generarGraficos(turnos);
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }

  contarTurnosPorEspecialidad(turnos: any[]): Record<string, number> {
    const conteo: Record<string, number> = {};

    turnos.forEach((turno) => {
      const especialidad = turno.especialidad;
      if (conteo[especialidad]) {
        conteo[especialidad]++;
      } else {
        conteo[especialidad] = 1;
      }
    });

    return conteo;
  }

  contarTurnosPorDia(turnos: any[]): Record<string, number> {
    const conteo: Record<string, number> = {};

    turnos.forEach((turno) => {
      const fechaTurno = new Date(turno.fecha.seconds * 1000)
        .toISOString()
        .split('T')[0];

      if (conteo[fechaTurno]) {
        conteo[fechaTurno]++;
      } else {
        conteo[fechaTurno] = 1;
      }
    });

    return conteo;
  }

  contarTurnosPorEspecialistaPorDia(
    turnos: any[],
    fechaInicio: Date,
    fechaFin: Date
  ): Record<string, number> {
    const conteo: Record<string, number> = {};

    turnos.forEach((turno) => {
      const fechaTurno = new Date(turno.fecha.seconds * 1000);

      if (fechaTurno >= fechaInicio && fechaTurno <= fechaFin) {
        const especialista = turno.especialistaNombre;

        if (conteo[especialista]) {
          conteo[especialista]++;
        } else {
          conteo[especialista] = 1;
        }
      }
    });

    return conteo;
  }

  contarTurnosFinalizadosPorEspecialistaPorDia(
    turnos: any[],
    fechaInicio: Date,
    fechaFin: Date
  ): Record<string, number> {
    const conteo: Record<string, number> = {};

    turnos.forEach((turno) => {
      const fechaTurno = new Date(turno.fecha.seconds * 1000);

      if (turno.estado == 'finalizado') {
        if (fechaTurno >= fechaInicio && fechaTurno <= fechaFin) {
          const especialista = turno.especialistaNombre;

          if (conteo[especialista]) {
            conteo[especialista]++;
          } else {
            conteo[especialista] = 1;
          }
        }
      }
    });

    return conteo;
  }

  generarGraficos(listaDeTurnos: any) {
    const fechaInicio = new Date('2024-11-01');
    const fechaFin = new Date('2024-11-28');

    const turnosPorEspecialidad =
      this.contarTurnosPorEspecialidad(listaDeTurnos);
    this.crearGrafico(
      'graficoPorEspecialidad',
      Object.keys(turnosPorEspecialidad),
      Object.values(turnosPorEspecialidad),
      'Turnos por Especialidad',
      'Cantidad de turnos'
    );

    const turnosPorDia = this.contarTurnosPorDia(listaDeTurnos);
    this.crearGrafico(
      'graficoPorDia',
      Object.keys(turnosPorDia),
      Object.values(turnosPorDia),
      'Turnos por Día',
      'Cantidad de turnos'
    );
  }

  generarGraficosPorDia() {
    if (!this.fechaInicio || !this.fechaFin) {
      console.log('Selecciona un rango válido.');
      return;
    }

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    if (inicio > fin) {
      console.log(
        'La fecha de inicio debe ser anterior o igual a la fecha de fin.'
      );
      return;
    }

    this.turnosService.traerTodosLosTurnos().subscribe(
      (turnos) => {
        turnos.sort((a: any, b: any) => {
          return a.especialistaNombre.localeCompare(b.especialistaNombre);
        });
        //
        const turnosPorEspecialista = this.contarTurnosPorEspecialistaPorDia(
          turnos,
          inicio,
          fin
        );
        this.crearGrafico(
          'graficoPorEspecialista',
          Object.keys(turnosPorEspecialista),
          Object.values(turnosPorEspecialista),
          'Turnos por Médico',
          'Cantidad de turnos'
        );

        const turnosFinalizadosPorEspecialistas =
          this.contarTurnosFinalizadosPorEspecialistaPorDia(
            turnos,
            inicio,
            fin
          );
        this.crearGrafico(
          'graficoFinalizados',
          Object.keys(turnosFinalizadosPorEspecialistas),
          Object.values(turnosFinalizadosPorEspecialistas),
          'Turnos Finalizados por médico',
          'Cantidad de turnos'
        );
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );

    this.showTurnosPorFecha = true;
  }

  crearGrafico(
    name: string,
    labels: string[],
    data: number[],
    title: string,
    label: string
  ): void {
    new Chart(name, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
      },
    });
  }

  descargarGraficoEnPDF(name: string): void {
    const canvas = document.getElementById(name) as HTMLCanvasElement;
    if (canvas) {
      html2canvas(canvas).then((canvasElement: any) => {
        const pdf = new jsPDF.jsPDF();

        const imgData = canvasElement.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);

        pdf.save('grafico.pdf');
      });
    }
  }
}
