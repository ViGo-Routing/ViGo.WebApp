import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullContainComponent } from './full-contain.component';

describe('FullContainComponent', () => {
  let component: FullContainComponent;
  let fixture: ComponentFixture<FullContainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullContainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullContainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
