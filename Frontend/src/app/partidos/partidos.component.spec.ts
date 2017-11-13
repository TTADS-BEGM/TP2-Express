import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosComponent } from './partidos.component';

describe('PartidosComponent', () => {
  let component: PartidosComponent;
  let fixture: ComponentFixture<PartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
