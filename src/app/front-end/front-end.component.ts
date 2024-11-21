import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Chart from 'chart.js/auto';

// Interfaces de datos

/**
 * Interfaz para el estado de respuestas.
 */
interface AnsweredStatus {
  answered: number;
  unanswered: number;
}

/**
 * Interfaz para la reputación más alta.
 */
interface HighestReputation {
  highest_reputation: {
    owner: {
      reputation: number;
    };
    view_count: number;
  };
}

/**
 * Interfaz para las vistas más bajas.
 */
interface LowestViews {
  lowest_views: {
    owner: {
      reputation: number;
    };
    view_count: number;
  };
}

/**
 * Interfaz para la fecha de creación más antigua y más nueva.
 */
interface OldestNewest {
  oldest: { creation_date: string; view_count: number };
  newest: { creation_date: string; view_count: number };
}

/**
 * Interfaz para el elemento menos visto.
 */
interface LeastViewed {
  least_viewed: { view_count: number; title: string };
}

/**
 * Interfaz para el aeropuerto con mayor movimiento.
 */
interface AeropuertoMayorMovimiento {
  aeropuerto: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para la aerolínea con más vuelos.
 */
interface AerolineaMayorVuelos {
  aerolinea: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para el día con más vuelos.
 */
interface DiaMayorVuelos {
  dia: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para las aerolíneas con más de 2 vuelos.
 */
interface AerolineasMasDe2Vuelos {
  aerolinea: string;
  dia: string;
  cantidad_vuelos: number;
}

/**
 * Componente que maneja las visualizaciones de datos relacionados con vuelos y reputaciones.
 * Utiliza Chart.js para generar gráficos basados en los datos obtenidos desde la API.
 */
@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.scss'],
})
export class FrontEndComponent implements OnInit {
  /**
   * Almacena las gráficas generadas.
   * @type {Record<string, Chart>}
   */
  public charts: { [key: string]: Chart } = {};

  /**
   * Constructor del componente.
   * @param {HttpClient} http - Servicio HTTP para realizar solicitudes a la API.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Carga todos los datos necesarios para mostrar las gráficas.
   */
  ngOnInit(): void {
    this.loadAnsweredStatus();
    this.loadHighestReputation();
    this.loadLowestViews();
    this.loadOldestNewest();
    this.loadLeastViewed();
    this.loadAeropuertoMayorMovimiento();
    this.loadAerolineaMayorVuelos();
    this.loadDiaMayorVuelos();
    this.loadAerolineasMasDe2Vuelos();
  }

  /**
   * Carga el estado de las respuestas y genera la gráfica de estado de respuestas.
   */
  private loadAnsweredStatus(): void {
    this.http
      .get<AnsweredStatus>(`${environment.dominioPersonal}/api/section1/answered-status`)
      .subscribe((data) => {
        new Chart('answeredStatusChart', {
          type: 'pie',
          data: {
            labels: ['Contestadas', 'No contestadas'],
            datasets: [
              {
                data: [data.answered, data.unanswered],
                backgroundColor: ['#4CAF50', '#FF5252'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga la reputación más alta y genera la gráfica de la reputación más alta.
   */
  private loadHighestReputation(): void {
    this.http
      .get<HighestReputation>(`${environment.dominioPersonal}/api/section1/highest-reputation`)
      .subscribe((data) => {
        this.charts['highestReputation'] = new Chart('highestReputationChart', {
          type: 'bar',
          data: {
            labels: ['Reputación', 'Vistas'],
            datasets: [
              {
                data: [data.highest_reputation.owner.reputation, data.highest_reputation.view_count],
                backgroundColor: ['#2196F3', '#FFC107'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga las vistas más bajas y genera la gráfica de vistas más bajas.
   */
  private loadLowestViews(): void {
    this.http
      .get<LowestViews>(`${environment.dominioPersonal}/api/section1/lowest-views`)
      .subscribe((data) => {
        this.charts['lowestViews'] = new Chart('lowestViewsChart', {
          type: 'bar',
          data: {
            labels: ['Reputación', 'Vistas'],
            datasets: [
              {
                data: [data.lowest_views.owner.reputation, data.lowest_views.view_count],
                backgroundColor: ['#673AB7', '#FF5722'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga los datos más antiguos y más nuevos y genera la gráfica de antigüedad.
   */
  private loadOldestNewest(): void {
    this.http
      .get<OldestNewest>(`${environment.dominioPersonal}/api/section1/oldest-newest`)
      .subscribe((data) => {
        this.charts['oldestNewest'] = new Chart('oldestNewestChart', {
          type: 'line',
          data: {
            labels: ['Más vieja', 'Más nueva'],
            datasets: [
              {
                data: [data.oldest.view_count, data.newest.view_count],
                borderColor: '#3F51B5',
                fill: false,
              },
            ],
          },
        });
      });
  }

  /**
   * Carga el elemento menos visto y genera la gráfica correspondiente.
   */
  private loadLeastViewed(): void {
    this.http
      .get<LeastViewed>(`${environment.dominioPersonal}/api/section1/least-viewed`)
      .subscribe((data) => {
        new Chart('leastViewedChart', {
          type: 'doughnut',
          data: {
            labels: [data.least_viewed.title],
            datasets: [
              {
                data: [data.least_viewed.view_count],
                backgroundColor: ['#009688'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga los datos del aeropuerto con mayor movimiento y genera la gráfica correspondiente.
   */
  private loadAeropuertoMayorMovimiento(): void {
    this.http
      .get<AeropuertoMayorMovimiento>(
        `${environment.dominioPersonal}/api/section2/aeropuerto-mayor-movimiento`
      )
      .subscribe((data) => {
        new Chart('aeropuertoMayorMovimientoChart', {
          type: 'pie',
          data: {
            labels: [data.aeropuerto],
            datasets: [
              {
                data: [data.cantidad_vuelos],
                backgroundColor: ['#FF9800'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga los datos de la aerolínea con más vuelos y genera la gráfica correspondiente.
   */
  private loadAerolineaMayorVuelos(): void {
    this.http
      .get<AerolineaMayorVuelos>(
        `${environment.dominioPersonal}/api/section2/aerolinea-mayor-vuelos`
      )
      .subscribe((data) => {
        this.charts['aerolineaMayorVuelos'] = new Chart('aerolineaMayorVuelosChart', {
          type: 'bar',
          data: {
            labels: [data.aerolinea],
            datasets: [
              {
                data: [data.cantidad_vuelos],
                backgroundColor: ['#8BC34A'],
              },
            ],
          },
        });
      });
  }

  /**
   * Carga los datos del día con más vuelos y genera la gráfica correspondiente.
   */
  private loadDiaMayorVuelos(): void {
    this.http
      .get<DiaMayorVuelos>(`${environment.dominioPersonal}/api/section2/dia-mayor-vuelos`)
      .subscribe((data) => {
        this.charts['diaMayorVuelos'] = new Chart('diaMayorVuelosChart', {
          type: 'line',
          data: {
            labels: [data.dia],
            datasets: [
              {
                data: [data.cantidad_vuelos],
                borderColor: '#FF5722',
                fill: false,
              },
            ],
          },
        });
      });
  }

  /**
   * Carga los datos de las aerolíneas con más de 2 vuelos y genera la gráfica correspondiente.
   */
  private loadAerolineasMasDe2Vuelos(): void {
    this.http
      .get<AerolineasMasDe2Vuelos[]>(
        `${environment.dominioPersonal}/api/section2/aerolineas-mas-de-2-vuelos`
      )
      .subscribe((data) => {
        const labels = data.map((item) => item.aerolinea);
        const values = data.map((item) => item.cantidad_vuelos);
        new Chart('aerolineasMasDe2VuelosChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: '#3F51B5',
              },
            ],
          },
        });
      });
  }
}
