import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Interfaz para el aeropuerto con mayor movimiento.
 */
interface AeropuertoMayorMovimiento {
  aeropuerto: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para la aerolínea con mayor cantidad de vuelos.
 */
interface AerolineaMayorVuelos {
  aerolinea: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para el día con mayor cantidad de vuelos.
 */
interface DiaMayorVuelos {
  dia: string;
  cantidad_vuelos: number;
}

/**
 * Interfaz para las aerolíneas con más de 2 vuelos por día.
 */
interface AerolineasMasDe2Vuelos {
  aerolinea: string;
  dia: string;
  cantidad_vuelos: number;
}

@Component({
  selector: 'app-datos-sql',
  templateUrl: './datos-sql.component.html',
  styleUrls: ['./datos-sql.component.scss']
})
export class DatosSqlComponent implements OnInit {
  /** Datos del aeropuerto con mayor movimiento */
  aeropuertoMayorMovimiento: AeropuertoMayorMovimiento | null = null;
  /** Datos de la aerolínea con mayor cantidad de vuelos */
  aerolineaMayorVuelos: AerolineaMayorVuelos | null = null;
  /** Datos del día con mayor cantidad de vuelos */
  diaMayorVuelos: DiaMayorVuelos | null = null;
  /** Datos de las aerolíneas con más de 2 vuelos por día */
  aerolineasMasDe2Vuelos: AerolineasMasDe2Vuelos[] | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Consultar la API para obtener los datos del aeropuerto con mayor movimiento
    this.http.get<AeropuertoMayorMovimiento>(`${environment.dominioPersonal}/api/section2/aeropuerto-mayor-movimiento`)
      .subscribe(data => this.aeropuertoMayorMovimiento = data);

    // Consultar la API para obtener los datos de la aerolínea con mayor cantidad de vuelos
    this.http.get<AerolineaMayorVuelos>(`${environment.dominioPersonal}/api/section2/aerolinea-mayor-vuelos`)
      .subscribe(data => this.aerolineaMayorVuelos = data);

    // Consultar la API para obtener los datos del día con mayor cantidad de vuelos
    this.http.get<DiaMayorVuelos>(`${environment.dominioPersonal}/api/section2/dia-mayor-vuelos`)
      .subscribe(data => this.diaMayorVuelos = data);

    // Consultar la API para obtener las aerolíneas con más de 2 vuelos por día
    this.http.get<AerolineasMasDe2Vuelos[]>(`${environment.dominioPersonal}/api/section2/aerolineas-mas-de-2-vuelos`)
      .subscribe(data => this.aerolineasMasDe2Vuelos = data);
  }
}
