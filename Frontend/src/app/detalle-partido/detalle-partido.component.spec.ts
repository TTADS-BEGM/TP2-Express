import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePartidoComponent } from './detalle-partido.component';

describe('DetallePartidoComponent', () => {
  let component: DetallePartidoComponent;
  let fixture: ComponentFixture<DetallePartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
