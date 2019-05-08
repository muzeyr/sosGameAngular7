import { Player } from './player';

export class Block {
	id     : number;
	free   : boolean = true;
	val    : string = "";  
	style  : string = "";
	player : Player;

}