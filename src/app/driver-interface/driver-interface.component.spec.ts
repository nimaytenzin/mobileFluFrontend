import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInterfaceComponent } from './driver-interface.component';

describe('DriverInterfaceComponent', () => {
  let component: DriverInterfaceComponent;
  let fixture: ComponentFixture<DriverInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
