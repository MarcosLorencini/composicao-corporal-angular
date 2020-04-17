import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComposicaoComponent } from './add-composicao-component';

describe('AddComposicaoComponentComponent', () => {
  let component: AddComposicaoComponent;
  let fixture: ComponentFixture<AddComposicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComposicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
