import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-board-game-component',
  templateUrl: './board-game-component.component.html',
  styleUrls: ['./board-game-component.component.scss']
})
export class BoardGameComponentComponent implements OnInit {

  //variables
  globalSizeOfGrid: number;
  score = 0;
  highestScore = 0;
  colArray: any[];
  rowArray: any[];
  intervalCount = 0;
  timer: any;
  defaultSize = 3;

  /**
   * Creates an instance of board game component component.
   * 
   */
  constructor(private cd: ChangeDetectorRef) { }

  /**
   * on init
   */
  ngOnInit() {
    //welcome rule pop up
    Swal.fire({
      title: 'Rules of The Board Game',
      text: `On game starts, in every 1 second, a random block is highlighted in green for 1 second. If you click the highlighted cell then score will be incremented by 1.
             If you click any unhighlighted block then score will be decremented by 1.
             If the score goes beyond high score then high score will be updated. You will have 120 seconds in each game.`,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: `Okay! let's start with 3x3, Easy one!`,
    }).then((result) => {
      if (result.value) {
        //triggered after reading rules
        this.selectGridSize(this.defaultSize); // default size is 3
        this.highestScore = Number(localStorage.getItem('highestScore'));
      }
    });
  }

  /**
   * Selects grid size
   * @param size 
   */
  selectGridSize(size: number) {
    this.globalSizeOfGrid = size;
    this.colArray = [];
    this.rowArray = [];
    //creating grid
    for (let i = 0; i < size; i++) {
      this.colArray.push(i);
    }
    for (let i = 0; i < size; i++) {
      this.rowArray.push(i);
    }
    //setting up blinking of green color
    this.setGreenBlink(size);
    this.cd.markForCheck(); // for detecting changes
  }

  /**
   * Sets green blink
   * @param sizeOfGrid 
   */
  setGreenBlink(sizeOfGrid: number) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: 'success',
      timer: 3000,
      title: 'Game started, All the best!!!'
    })
    clearInterval(this.timer);
    this.intervalCount = 0;
    this.score = 0;
    this.timer = setInterval(() => {
      const findClass = document.getElementsByClassName("grid-column");
      for (let i = 0; i < findClass.length; i++) {
        findClass[i].classList.remove('selected-index');
      }
      //generate random number within size * size
      const gridIndex = Math.floor(Math.random() * (sizeOfGrid * sizeOfGrid));
      //applying class to random generated index
      document.getElementsByClassName("grid-column")[gridIndex].classList.add("selected-index");
      if (this.intervalCount++ > 119) {
        this.resetGameAfterTimeOver();
      }
    }, 1000);
  }

  /**
   * Resets game after time over
   */
  resetGameAfterTimeOver() {
    clearInterval(this.timer);
    Swal.fire({
      title: 'Game Over!!!',
      text: `Click Okay to play again`,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: `Okay`,
    }).then((result) => {
      if (result.value) {
        //triggered after reading rules
        this.restartGame()
      }
    });
  }

  /**
   * Resets game
   */
  resetGame() {
    this.score = 0;
    this.intervalCount = 0;
    //cleating intervalset before
    clearInterval(this.timer);
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: 'info',
      timer: 3000,
      title: 'Game stopped! Play again!'
    })
  }

  /**
   * Restarts game
   */
  restartGame() {
    this.resetGame();
    this.selectGridSize(this.globalSizeOfGrid);
  }

  /**
   * Determines whether grid click on
   * @param event 
   */
  onGridClick(event: any) {
    //checks wheather class exists or not
    if (event.target.classList.contains('selected-index')) {
      this.score++;
    }
    else {
      this.score--;
    }
    //setting highest score to localStorage as well
    if (this.score > this.highestScore) {
      this.highestScore = this.score;
      localStorage.setItem("highestScore", this.highestScore.toString());
    }
  }
}
