import { Injectable } from '@angular/core'; 
import { Player } from '../entity/player';
import { Block } from '../entity/block';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PlayerBlock } from '../entity/playerBlock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	 
	public token: string;
	private url = 'http://localhost:8764/';

	players = []
	turn: number = 0; // By Default First Player turn is First
	draw: number = 0; 
	blocks = []; 
	freeBlocksRemaining = 100;

	constructor(private http: HttpClient) { 
		this.initBlocks();
		this.initPlayers();
	}
 
	playerBlockSet(	blockList:Block[],player:Player): Observable<any> {
		console.log('>>');
		var playerBlock = new PlayerBlock();
		 playerBlock.setBlockList(blockList);
		 playerBlock.setPlayer(player);
		return this.http.post<any>(this.url+'playerBlock', playerBlock)
		  .pipe(
			map(data => {
				console.log(data);
				return data;
			})
		  );
	  }

	initBlocks() {
		this.blocks = [];
		
		for (var i = 1; i <= 100; ++i) {
			var block = new Block();
			
			block.free = true;
			block.val = "";
			block.style = "";
			block.id  = i;
	
			this.blocks.push(block);
		}
	}

	initPlayers() {
		// Player1
		var player1 = new Player();
		player1.bot = false;
		player1.name= 'UZEYR';
		player1.score = 0;
		player1.order = true;
		player1.style ='win';

		var player2 = new Player();
		player2.name= 'OZCAN';
		player2.score = 0;
		player2.style ='win2';
		player2.order = false;
		

		this.players.push(player1);
		this.players.push(player2);
	}

	changeTurn() {

		if( this.turn == 1 ) {
			this.turn = 0;
		} else {
			this.turn = 1;
		}

		return this.turn;
	}
	playersTurn(){
		console.log('>');
		return this.players[this.turn];
	}

	blockSetComplete() { 

		return false;
	} 
}
