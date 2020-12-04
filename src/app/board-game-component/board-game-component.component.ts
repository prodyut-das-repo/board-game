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

  /**
   * Creates an instance of board game component component.
   * 
   */
  constructor(private cd: ChangeDetectorRef) { }

  /**
   * on init
   */
  ngOnInit() {
    Swal.fire({
      title: 'Rules of The Board Game',
      text: `On game start, in every 1 second, a randm cell is highlighted in green for 1 second. If you click the highlighted cell then score will be incremented by 1.
             If you click any unhighlighted cell then score will be decremented by 1.
             If the score goes beyond high score then high score will be updated. You will have 120 seconds in each game.`,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: `Okay! let's start with 3x3, Easy one`,
    }).then((result) => {
      if (result.value) {
        this.selectGridSize(3);
        this.highestScore = Number(localStorage.getItem('highestScore'));
      }
    })
    // this.selectGridSize(3);
    // this.highestScore = Number(localStorage.getItem('highestScore'));
  }

  /**
   * Selects grid size
   * @param size 
   */
  selectGridSize(size: number) {
    this.globalSizeOfGrid = size;
    this.colArray = [];
    this.rowArray = [];
    for (let i = 0; i < size; i++) {
      this.colArray.push(i);
    }
    for (let i = 0; i < size; i++) {
      this.rowArray.push(i);
    }
    this.setGreenBlink(size);
    this.cd.markForCheck();
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
      timer: 5000,
      title: 'Game started, All the best!!!'
    })
    clearInterval(this.timer);
    this.intervalCount = 0;
    this.score = 0;
    this.timer = setInterval(() => {
      const matches = document.getElementsByClassName("grid-column");
      for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove('selected-index');
      }
      const gridIndex = Math.floor(Math.random() * (sizeOfGrid * sizeOfGrid));
      document.getElementsByClassName("grid-column")[gridIndex].classList.add("selected-index");
      if (this.intervalCount++ > 119) {
        Swal.fire('Hello world!');
        this.resetGame();
      }
    }, 1000);
  }

  /**
   * Restarts game
   */
  resetGame() {
    this.score = 0;
    this.intervalCount = 0;
    clearInterval(this.timer);
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: 'success',
      timer: 5000,
      title: 'Game stopped / Time up!, Play again!'
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
    if (event.target.classList.contains('selected-index')) {
      this.score++;
    }
    else {
      this.score--;
    }
    if (this.score > this.highestScore) {
      this.highestScore = this.score;
      localStorage.setItem("highestScore", this.highestScore.toString());
    }
  }
}
