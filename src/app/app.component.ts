import { Component } from '@angular/core';

import { Player } from './entity/player';
import { Block } from './entity/block';
import { ApiService  } from './services/api.service';


console.log('>><<<')
import { MatGridListModule } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]

})

export class AppComponent {
  title = 'app';
	lock = false;
  constructor(public apiService: ApiService, public snackBar: MatGridListModule) {
		
	}
  newGame() {
		this.apiService.freeBlocksRemaining = 9;
		this.apiService.initBlocks();
		this.lock = false;
		this.apiService.turn = 0;
	}

	resetGame(event) {
		location.reload();
		event.preventDefault();
	}
  playerClickSos(i,val){
    console.log('>><<<')
		if( this.apiService.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
			return;
		}

		this.apiService.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

		if( this.apiService.freeBlocksRemaining <= 0 ) {

			this.apiService.draw += 1;
			this.lock = true;
			 
			this.newGame();
			return;
		}


		this.apiService.blocks[i].free = false;
		this.apiService.blocks[i].SOS = val;
    
		if( this.apiService.turn == 0 ) { // Player1 Turn
			this.apiService.blocks[i].setValue("");
		
		} else { // Bot Turn
			this.apiService.blocks[i].setValue("cross");	
		}

		var complete = this.apiService.blockSetComplete();

		if( complete == false ) {
			this.changeTurn();	
			return;
			
		} else {
			this.lock = true;
			this.apiService.players[this.apiService.turn].score += 1;
 

		    this.newGame();
		    return;
		}
  }
	playerClick(i) {
    console.log('>>')
		if( this.apiService.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
			return;
		}

		this.apiService.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

		if( this.apiService.freeBlocksRemaining <= 0 ) {

			this.apiService.draw += 1;
			this.lock = true;
			 
			this.newGame();
			return;
		}


		this.apiService.blocks[i].free = false;

		if( this.apiService.turn == 0 ) { // Player1 Turn
			this.apiService.blocks[i].setValue("tick");
		
		} else { // Bot Turn
			this.apiService.blocks[i].setValue("cross");	
		}

		var complete = this.apiService.blockSetComplete();

		if( complete == false ) {
			this.changeTurn();	
			return;
			
		} else {
			this.lock = true;
			this.apiService.players[this.apiService.turn].score += 1;
 

		    this.newGame();
		    return;
		}
		
	}


	botTurn() {

		if( this.apiService.freeBlocksRemaining <= 0 ) {
			return;
		}

		var bot_selected = this.apiService.figureBotMove()-1;
		
		if( this.apiService.blocks[bot_selected].free == true ) {
			this.playerClick(bot_selected);	
		} else {
			this.botTurn();
			return;
		}

	}


	changeTurn() {
		var player = this.apiService.changeTurn();

		if( player == 1 ) { // Bot Turn
			this.botTurn();
		
		}
	}

}
