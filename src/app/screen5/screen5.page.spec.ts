import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Screen5Page } from './screen5.page';

describe('Screen5Page', () => {
  let component: Screen5Page;
  let fixture: ComponentFixture<Screen5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
