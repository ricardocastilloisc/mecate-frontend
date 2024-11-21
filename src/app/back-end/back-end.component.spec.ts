import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BackEndComponent } from './back-end.component';
import { environment } from 'src/environments/environment';

// Mock de las interfaces
const mockAnsweredStatus = { answered: 10, unanswered: 5 };
const mockHighestReputation = {
  highest_reputation: { owner: { reputation: 1000 }, view_count: 500 },
};
const mockLowestViews = {
  lowest_views: { owner: { reputation: 500 }, view_count: 50 },
};
const mockOldestNewest = {
  oldest: { creation_date: '2022-01-01', view_count: 20 },
  newest: { creation_date: '2023-01-01', view_count: 100 },
};
const mockLeastViewed = {
  least_viewed: { view_count: 10, title: 'Least Viewed Item' },
};

describe('BackEndComponent', () => {
  let component: BackEndComponent;
  let fixture: ComponentFixture<BackEndComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackEndComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackEndComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Asegurarse de que todas las solicitudes hayan sido respondidas
    httpMock.verify();
  });

  it('should fetch and set apis', () => {
    // Simular las solicitudes HTTP y asegurarse de que solo haya una solicitud por endpoint
    const req1 = httpMock.expectOne(
      `${environment.dominioPersonal}/api/section1/answered-status`
    );
    const req2 = httpMock.expectOne(
      `${environment.dominioPersonal}/api/section1/highest-reputation`
    );
    const req3 = httpMock.expectOne(
      `${environment.dominioPersonal}/api/section1/lowest-views`
    );
    const req4 = httpMock.expectOne(
      `${environment.dominioPersonal}/api/section1/oldest-newest`
    );
    const req5 = httpMock.expectOne(
      `${environment.dominioPersonal}/api/section1/least-viewed`
    );

    // Verificar que las solicitudes sean de tipo GET
    expect(req1.request.method).toBe('GET');
    expect(req2.request.method).toBe('GET');
    expect(req3.request.method).toBe('GET');
    expect(req4.request.method).toBe('GET');
    expect(req5.request.method).toBe('GET');

    // Simular las respuestas de las solicitudes
    req1.flush(mockAnsweredStatus);
    req2.flush(mockHighestReputation);
    req3.flush(mockLowestViews);
    req4.flush(mockOldestNewest);
    req5.flush(mockLeastViewed);

    // Esperar que las propiedades del componente se actualicen con los datos de la respuesta
    expect(component.answeredStatus).toEqual(mockAnsweredStatus);
    expect(component.highestReputation).toEqual(mockHighestReputation);
    expect(component.lowestViews).toEqual(mockLowestViews);
    expect(component.oldestNewest).toEqual(mockOldestNewest);
    expect(component.leastViewed).toEqual(mockLeastViewed);
  });
});
