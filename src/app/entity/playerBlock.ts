import { Player } from './player';
import { Block } from './block';

export class PlayerBlock {
	blockList:Block[];
	player:Player;

	setBlockList(list: Block[]) {
		return this.blockList = list; 
	}

	
	setPlayer(player: Player) {
	 	return this.player = player; ;
	}


}