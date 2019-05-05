export class Block {
	free: boolean = true;

	value: string = "";  
	symbol: string = "";  
	SOS: string = "";  //S-O


	setValue(value) {
		this.value = value

		if( this.value == "tick" ) {
			this.symbol = "done";
		} else {
			this.symbol = "close";
		}
	}


}