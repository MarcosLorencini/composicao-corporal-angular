import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposicaoListComponent } from './composicao-list.component';

describe('ComposicaoListComponent', () => {
  let component: ComposicaoListComponent;
  let fixture: ComponentFixture<ComposicaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposicaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposicaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
