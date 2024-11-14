import { Component, OnDestroy } from '@angular/core';
import { AutentificadorService } from '../../services/autentificador.service';
import { NgFor, NgIf } from '@angular/common';
import { CapitalizarPrimerLetraPipe } from '../../pipes/capitalizar-primer-letra.pipe';
import { DisponibilidadEspecialistaComponent } from '../../components/perfil/disponibilidad-especialista/disponibilidad-especialista.component';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { TablaHistoriaClinicaComponent } from '../../components/historia-clinica/tabla-historia-clinica/tabla-historia-clinica.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CapitalizarPrimerLetraPipe,
    DisponibilidadEspecialistaComponent,
    TablaHistoriaClinicaComponent,
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
  animations: [
    trigger('bounce', [
      // Creamos la animación 'bounce'
      state('normal', style({ transform: 'translateY(0)' })), // Definimos el estado 'normal' con transformación
      state('bounce', style({ transform: 'translateY(00px)' })), // Definimos el estado 'bounce' con
      transition('normal => bounce', [
        animate('0.5s ease-in-out', style({ transform: 'translateY(-300px)' })),
        animate('0.5s ease-in-out'),
      ]), // Transición de 'normal' a 'bounce' con varias animaciones
      transition('bounce => normal', [animate('0.5s ease-in-out')]), // Transición de 'bounce' a 'normal' con
    ]),
    trigger('carouselAnimation', [
      // Creamos la animación 'carouselAnimation'
      transition('void => *', [
        // Definimos la transición de 'void' a cualquier estado
        style({ opacity: 0, transform: 'scale(0.95)' }), // Estilo inicial de opacidad 0 y escala 0.95
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })), // Animación a opacidad 1 y escala 1
      ]),
      transition('* => void', [
        // Definimos la transición de cualquier estado a 'void'
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ), // Animación a opacidad 0 y
      ]),
    ]),
  ],
})
export class MiPerfilComponent implements OnDestroy {
  user: any = {};
  showHorarios = false;
  historiaClinica: any;
  showHistoriaClinica: boolean = false;
  isBounce = false;

  carouselInterval: any;
  currentImageIndex = 0;

  images: string[] = [];

  constructor(
    private auth: AutentificadorService,
    protected hcService: HistoriaClinicaService
  ) {
    this.user = auth.objUsuario;

    if (this.user.tipo == 'paciente') {
      this.images.push(this.user.imagen);
      this.images.push(this.user.imagen2);
      this.startCarousel();
    }
  }

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  startCarousel() {
    // Método para iniciar el carrusel
    this.stopCarousel(); //
    this.carouselInterval = setInterval(() => {
      // Establece un intervalo para cambiar la imagen
      this.nextImage(); // Cambia a la siguiente imagen
    }, 500); // Cambia de imagen cada 2 segundos
  }
  nextImage() {
    // Método para avanzar a la siguiente imagen
    if (this.currentImageIndex == 0) this.currentImageIndex = 1;
    else this.currentImageIndex = 0;
  }

  ngOnDestroy() {
    // Método que se ejecuta al destruir el componente
    this.stopCarousel(); // Asegura que el carrusel se detenga cuando el componente se destruye
  }

  stopCarousel() {
    // Método para detener el carrusel
    if (this.carouselInterval) {
      // Verifica si hay un intervalo activo
      clearInterval(this.carouselInterval); // Limpia el intervalo
      this.carouselInterval = null; // Reinicia la variable del intervalo
    }
  }

  clickAdminisitrarHorario() {
    this.showHorarios = true;
    setTimeout(() => {
      this.isBounce = !this.isBounce;
    }, 100);
  }

  async clickVerHistoriaClinica() {
    this.showHistoriaClinica = true;
    this.hcService.generarHistoriaClinica(this.user.userId).subscribe(
      (historiaPaciente) => {
        this.historiaClinica = historiaPaciente;
      },
      (error) => {
        console.error('error:', error);
      }
    );
  }
}
