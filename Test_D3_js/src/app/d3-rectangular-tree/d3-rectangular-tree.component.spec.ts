import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3RectangularTreeComponent } from './d3-rectangular-tree.component';

describe('D3RectangularTreeComponent', () => {
  let component: D3RectangularTreeComponent;
  let fixture: ComponentFixture<D3RectangularTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3RectangularTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3RectangularTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
