import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFooterComponent } from './food-footer.component';

describe('FoodFooterComponent', () => {
  let component: FoodFooterComponent;
  let fixture: ComponentFixture<FoodFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
