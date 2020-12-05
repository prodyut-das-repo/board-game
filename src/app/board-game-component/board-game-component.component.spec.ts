import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BoardGameComponentComponent } from './board-game-component.component';

describe('ListOfPaymentsItemComponent', () => {
  let component: BoardGameComponentComponent;
  let fixture: ComponentFixture<BoardGameComponentComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BoardGameComponentComponent],
      imports: [],
      providers: []
    });
    fixture = TestBed.createComponent(BoardGameComponentComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('makes call to ngOnInit ', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.whenStable().then(() => {
      component.ngOnInit();
      expect(component.ngOnInit()).toHaveBeenCalled();
    });
  });
  it('makes call to selectGridSize ', () => {
    spyOn(component, 'selectGridSize').and.callThrough();
    fixture.whenStable().then(() => {
      component.selectGridSize(3);
      component.setGreenBlink(3);
      expect(component.selectGridSize).toHaveBeenCalled();
    });
  });
  it('makes call to resetGame ', () => {
    spyOn(component, 'resetGame').and.callThrough();
    fixture.whenStable().then(() => {
      component.resetGame();
      expect(component.resetGame).toHaveBeenCalled();
    });
  });
  it('makes call to restartGame ', () => {
    spyOn(component, 'restartGame').and.callThrough();
    fixture.whenStable().then(() => {
      component.restartGame();
      expect(component.restartGame).toHaveBeenCalled();
    });
  });
  it('makes call to resetGameAfterTimeOver ', () => {
    spyOn(component, 'resetGameAfterTimeOver').and.callThrough();
    fixture.whenStable().then(() => {
      component.resetGameAfterTimeOver();
      expect(component.resetGameAfterTimeOver).toHaveBeenCalled();
    });
  });
  it('makes call to onGridClick ', () => {
    spyOn(component, 'onGridClick').and.callThrough();
    fixture.whenStable().then(() => {
      const event = new MouseEvent('click');
      component.onGridClick(event);
      expect(component.onGridClick).toHaveBeenCalled();
    });
  });
  it('makes call to onGridClick ', () => {
    spyOn(component, 'onGridClick').and.callThrough();
    fixture.whenStable().then(() => {
      const event = 's'
      component.score = 22;
      component.highestScore = 2;
      component.onGridClick(event);
      expect(component.onGridClick).toHaveBeenCalled();
    });
  });
});
