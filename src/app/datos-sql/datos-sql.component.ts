import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Interfaz para el aeropuerto con mayor movimiento.
 * Define las propiedades del aeropuerto con el mayor número de vuelos.
 */
interface AeropuertoMayorMovimiento {
  aeropuerto: string;   /** Nombre del aeropuerto */
  cantidad_vuelos: number;  /** Número total de vuelos en ese aeropuerto */
}

/**
 * Interfaz para la aerolínea con mayor cantidad de vuelos.
 * Define las propiedades de la aerolínea con el mayor número de vuelos.
 */
interface AerolineaMayorVuelos {
  aerolinea: string;   /** Nombre de la aerolínea */
  cantidad_vuelos: number;  /** Número total de vuelos de la aerolínea */
}

/**
 * Interfaz para el día con mayor cantidad de vuelos.
 * Define las propiedades del día con el mayor número de vuelos.
 */
interface DiaMayorVuelos {
  dia: string;   /** Fecha del día con el mayor número de vuelos */
  cantidad_vuelos: number;  /** Número total de vuelos en ese día */
}

/**
 * Interfaz para las aerolíneas con más de 2 vuelos por día.
 * Define las propiedades de las aerolíneas que tienen más de 2 vuelos en un día específico.
 */
interface AerolineasMasDe2Vuelos {
  aerolinea: string;   /** Nombre de la aerolínea */
  dia: string;   /** Día en el que la aerolínea tiene más de 2 vuelos */
  cantidad_vuelos: number;  /** Número total de vuelos de esa aerolínea en el día especificado */
}

@Component({
  selector: 'app-datos-sql',   /** Selector del componente */
  templateUrl: './datos-sql.component.html',   /** Archivo de plantilla HTML del componente */
  styleUrls: ['./datos-sql.component.scss']   /** Archivo de estilos SCSS del componente */
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

  /**
   * Constructor del componente.
   * @param http - Servicio HttpClient para hacer peticiones HTTP
   */
  constructor(private http: HttpClient) {}

  /**
   * Método de inicialización del componente.
   * Realiza las peticiones HTTP a las distintas rutas de la API para obtener los datos.
   */
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
