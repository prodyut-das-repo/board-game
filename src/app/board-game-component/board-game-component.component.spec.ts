import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameComponentComponent } from './board-game-component.component';

describe('BoardGameComponentComponent', () => {
  let component: BoardGameComponentComponent;
  let fixture: ComponentFixture<BoardGameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
