import { Component,ElementRef } from '@angular/core';
import { Player } from './entity/player';
import { Block } from './entity/block';
import { ApiService  } from './services/api.service'; 
import {MatButtonModule,MatIconModule,MatGridListModule} from '@angular/material'
import { HttpClient } from '@angular/common/http';
import { PlayerBlock } from './entity/playerBlock';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]

})

export class AppComponent { 
  title = 'app';
	lock = false;
	satir = 9;
	block : Block[]; 
	private el: HTMLElement;

	
  constructor(public apiService: ApiService, public snackBar: MatGridListModule,el: ElementRef,private http: HttpClient) {
		 this.el = el.nativeElement;  
	}
  newGame() {
		this.apiService.freeBlocksRemaining = 99;
		this.apiService.initBlocks();
		this.lock = false;
		this.apiService.turn = 0;
	}
	playerBlockSet(blocks,players){
		var tht = this;
		this.apiService.playerBlockSet(blocks,players) .subscribe(
			function(response) { 
				console.log('>>');
				tht.apiService.blocks = response.blockList;
				tht.apiService.players[tht.apiService.turn] = response.player;
				tht.apiService.changeTurn();
				
			},
			function(error) { console.log("Error happened" + error)},
			function() { console.log("the subscription is completed")}
		);
		

	}
  
	resetGame(event) {
		location.reload();
		event.preventDefault();
	}
  playerClickSos(i,val){  
		console.log('>>');
		if( this.apiService.blocks[i].free == false || this.lock == true ) {  
			return;
		}
 		this.apiService.blocks[i].free = false;
		this.apiService.blocks[i].val  = val;

		this.playerBlockSet(this.apiService.blocks,this.apiService.playersTurn());
	
		this.apiService.freeBlocksRemaining -= 1;  
 
		
  }

}
