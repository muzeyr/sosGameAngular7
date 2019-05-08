export class Player {

	order: boolean = true;
	score: number = 0;
	name :string;
	id:number;
	bot:boolean = true;
	style:string;

	updateScore(total: number) {
		this.score += total;
		return this.score;
	}
}