import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Interfaz que define la estructura de datos para el estado de respuestas.
 *
 * @interface
 */
interface AnsweredStatus {
  /** Número de respuestas contestadas */
  answered: number;
  /** Número de respuestas no contestadas */
  unanswered: number;
}

/**
 * Interfaz que define la estructura de datos para la mejor reputación y las vistas más altas.
 *
 * @interface
 */
interface HighestReputation {
  highest_reputation: {
    /** Propietario con la mejor reputación */
    owner: {
      /** Reputación del propietario */
      reputation: number;
    };
    /** Número de vistas */
    view_count: number;
  };
}

/**
 * Interfaz que define la estructura de datos para las vistas más bajas.
 *
 * @interface
 */
interface LowestViews {
  lowest_views: {
    /** Propietario con la menor reputación */
    owner: {
      /** Reputación del propietario */
      reputation: number;
    };
    /** Número de vistas */
    view_count: number;
  };
}

/**
 * Interfaz que define la estructura de datos para los elementos más antiguos y más nuevos.
 *
 * @interface
 */
interface OldestNewest {
  /** Elemento más antiguo */
  oldest: {
    /** Fecha de creación */
    creation_date: string;
    /** Número de vistas */
    view_count: number;
  };
  /** Elemento más nuevo */
  newest: {
    /** Fecha de creación */
    creation_date: string;
    /** Número de vistas */
    view_count: number;
  };
}

/**
 * Interfaz que define la estructura de datos para el elemento con menos vistas.
 *
 * @interface
 */
interface LeastViewed {
  least_viewed: {
    /** Número de vistas */
    view_count: number;
    /** Título del ítem */
    title: string;
  };
}

/**
 * Componente que maneja la obtención de diferentes datos desde el backend.
 *
 * @component
 */
@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.scss']
})
export class BackEndComponent implements OnInit {
  /** Estado de respuestas contestadas y no contestadas */
  answeredStatus: AnsweredStatus | null = null;
  /** Datos de la mejor reputación */
  highestReputation: HighestReputation | null = null;
  /** Datos de las vistas más bajas */
  lowestViews: LowestViews | null = null;
  /** Datos de los elementos más antiguos y más nuevos */
  oldestNewest: OldestNewest | null = null;
  /** Datos del ítem con menos vistas */
  leastViewed: LeastViewed | null = null;

  /**
   * Constructor del componente BackEndComponent.
   *
   * @param {HttpClient} http - Servicio de HttpClient para realizar las solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Realiza solicitudes HTTP para obtener los datos que se van a mostrar en la vista.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.http.get<AnsweredStatus>(`${environment.dominioPersonal}/api/section1/answered-status`)
      .subscribe(data => this.answeredStatus = data);

    this.http.get<HighestReputation>(`${environment.dominioPersonal}/api/section1/highest-reputation`)
      .subscribe(data => this.highestReputation = data);

    this.http.get<LowestViews>(`${environment.dominioPersonal}/api/section1/lowest-views`)
      .subscribe(data => this.lowestViews = data);

    this.http.get<OldestNewest>(`${environment.dominioPersonal}/api/section1/oldest-newest`)
      .subscribe(data => this.oldestNewest = data);

    this.http.get<LeastViewed>(`${environment.dominioPersonal}/api/section1/least-viewed`)
      .subscribe(data => this.leastViewed = data);
  }
}
