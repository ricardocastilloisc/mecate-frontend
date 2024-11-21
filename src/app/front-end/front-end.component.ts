import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Chart from 'chart.js/auto';

// Interfaces de datos
interface AnsweredStatus {
  answered: number;
  unanswered: number;
}
interface HighestReputation {
  highest_reputation: {
    owner: {
      reputation: number;
    };
    view_count: number;
  };
}
interface LowestViews {
  lowest_views: {
    owner: {
      reputation: number;
    };
    view_count: number;
  };
}
interface OldestNewest {
  oldest: { creation_date: string; view_count: number };
  newest: { creation_date: string; view_count: number };
}
interface LeastViewed {
  least_viewed: { view_count: number; title: string };
}
interface AeropuertoMayorMovimiento {
  aeropuerto: string;
  cantidad_vuelos: number;
}
interface AerolineaMayorVuelos {
  aerolinea: string;
  cantidad_vuelos: number;
}
interface DiaMayorVuelos {
  dia: string;
  cantidad_vuelos: number;
}
interface AerolineasMasDe2Vuelos {
  aerolinea: string;
  dia: string;
  cantidad_vuelos: number;
}

@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.scss'],
})
export class FrontEndComponent implements OnInit {
  public charts: { [key: string]: Chart  }  = {}; // Almacena las gráficas generadas

  constructor(private http: HttpClient) {}

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

  private loadAerolineasMasDe2Vuelos(): void {
    this.http
      .get<AerolineasMasDe2Vuelos[]>(
        `${environment.dominioPersonal}/api/section2/aerolineas-mas-de-2-vuelos`
      )
      .subscribe((data) => {
        const labels = data.map((item) => item.aerolinea);
        const values = data.map((item) => item.cantidad_vuelos);

        this.charts['aerolineasMasDe2Vuelos'] = new Chart('aerolineasMasDe2VuelosChart', {
          type: 'bar',
          data: {
            labels,
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
