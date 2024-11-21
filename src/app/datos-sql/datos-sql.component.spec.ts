import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSqlComponent } from './datos-sql.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('DatosSqlComponent', () => {
  let component: DatosSqlComponent;
  let fixture: ComponentFixture<DatosSqlComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosSqlComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSqlComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  })

  afterEach(() => {
    // Verificamos que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });


  it('should make HTTP requests and update properties', () => {
    const mockAeropuertoMayorMovimiento = { aeropuerto: 'Aeropuerto A', cantidad_vuelos: 100 };
    const mockAerolineaMayorVuelos = { aerolinea: 'Aerolínea A', cantidad_vuelos: 50 };
    const mockDiaMayorVuelos = { dia: '2024-11-21', cantidad_vuelos: 75 };
    const mockAerolineasMasDe2Vuelos = [
      { aerolinea: 'Aerolínea A', dia: '2024-11-21', cantidad_vuelos: 10 },
      { aerolinea: 'Aerolínea B', dia: '2024-11-21', cantidad_vuelos: 3 }
    ];



    const req1 = httpMock.expectOne(`${environment.dominioPersonal}/api/section2/aeropuerto-mayor-movimiento`);
    const req2 = httpMock.expectOne(`${environment.dominioPersonal}/api/section2/aerolinea-mayor-vuelos`);
    const req3 = httpMock.expectOne(`${environment.dominioPersonal}/api/section2/dia-mayor-vuelos`);
    const req4 = httpMock.expectOne(`${environment.dominioPersonal}/api/section2/aerolineas-mas-de-2-vuelos`);

    expect(req1.request.method).toBe('GET');
    expect(req2.request.method).toBe('GET');
    expect(req3.request.method).toBe('GET');
    expect(req4.request.method).toBe('GET');

 // Simulamos la respuesta de la primera solicitud HTTP
    req1.flush(mockAeropuertoMayorMovimiento);

    // Simulamos la respuesta de la segunda solicitud HTTP

    req2.flush(mockAerolineaMayorVuelos);

    // Simulamos la respuesta de la tercera solicitud HTTP

    req3.flush(mockDiaMayorVuelos);

    // Simulamos la respuesta de la cuarta solicitud HTTP

    req4.flush(mockAerolineasMasDe2Vuelos);


    // Verificamos que los datos se hayan asignado correctamente a las propiedades
    expect(component.aeropuertoMayorMovimiento).toEqual(mockAeropuertoMayorMovimiento);
    expect(component.aerolineaMayorVuelos).toEqual(mockAerolineaMayorVuelos);
    expect(component.diaMayorVuelos).toEqual(mockDiaMayorVuelos);
    expect(component.aerolineasMasDe2Vuelos).toEqual(mockAerolineasMasDe2Vuelos);
  });


});
