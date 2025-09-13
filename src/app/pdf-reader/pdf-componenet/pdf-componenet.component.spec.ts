import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfComponenetComponent } from './pdf-componenet.component';

describe('PdfComponenetComponent', () => {
  let component: PdfComponenetComponent;
  let fixture: ComponentFixture<PdfComponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfComponenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
