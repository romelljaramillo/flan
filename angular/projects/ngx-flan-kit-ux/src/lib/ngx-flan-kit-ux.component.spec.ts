import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlanKitUxComponent } from './ngx-flan-kit-ux.component';

describe('NgxFlanKitUxComponent', () => {
  let component: NgxFlanKitUxComponent;
  let fixture: ComponentFixture<NgxFlanKitUxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFlanKitUxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxFlanKitUxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
