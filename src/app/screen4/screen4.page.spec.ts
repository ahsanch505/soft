import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Screen4Page } from './screen4.page';

describe('Screen4Page', () => {
  let component: Screen4Page;
  let fixture: ComponentFixture<Screen4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
