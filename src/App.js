import React from "react";
import "./App.css";

// component import
import Ship from "./components/shipComponent/ship";
import Statues from "./components/playerStatues/statues";

// get ship info module
import getShip from "./action/getRandomShip";

// can change this variable as your mind to change players and round count
const roundCount = 3;
const playerInitData = [
	{ name: "Luke", round: 0, shipInfo: [], raceLength: 10000*roundCount},
	{ name: "Sam", round: 0, shipInfo: [], raceLength: 10000*roundCount},
	{ name: "Tom", round: 0, shipInfo: [], raceLength: 10000*roundCount},
	{ name: "Han", round: 0, shipInfo: [], raceLength: 10000*roundCount}
];

class App extends React.Component {

	constructor(props) {
		super(props);
		// startMatch: match state, true: matching, else not matching
		// gameResult: gameResult message or error message
		this.state = {
			players: playerInitData.map(row => {
				return {...row};
			}),
			startMatch: false,
			gameResult: false
		};
		// new game when click new
		this.startGame = this.startGame.bind(this);
	}

	async changePlayerStatues(playerId,roundNumber,raceLength,addFlag) {
		let tempPlayers = [...this.state.players];
		for(let i = 0; i < tempPlayers.length; i++) {
			if(playerId === i) {
				tempPlayers[i].round = roundNumber;
				tempPlayers[i].raceLength = raceLength;
				if(addFlag) {
					let tempShipInfo = await getShip(roundNumber);
					tempPlayers[i].shipInfo = [...tempPlayers[i].shipInfo,tempShipInfo];
				}
			}
		}
		this.setState({
			players: tempPlayers
		});
		return;
	}

	async startGame() {
		if(this.state.startMatch) {
			// if match is running not allow new game
			console.log("Game is running now.");
			return;
		}

		await this.setState({
			players: playerInitData.map(row => {
				return {...row};
			}),
			startMatch: true,
			gameResult: false
		});

		// get first ship info
		for(let i = 0; i < this.state.players.length; i++) {
			await this.changePlayerStatues(i,1,10000*roundCount,true);
		}

		// go on running until get result
		let flag = true;
		while(flag) {
			for( let i = 0; i < this.state.players.length; i++) {
				let row = this.state.players[i];
				let id = i;
				let lastShipModel = row.shipInfo.slice(-1)[0];
				let tempLength = row.raceLength*1 - parseInt(lastShipModel.shipSpeed)*1;
				if(3 - Math.floor(tempLength/10000) !== row.round) {
					if(row.round >= roundCount) {
						flag = false;
						this.setState({
							startMatch: false,
							gameResult: row.name + " is Winner!"
						});
						break;
					} else {
						await this.changePlayerStatues(id,row.round + 1,tempLength,true);
					}
				} else {
					await this.changePlayerStatues(id,row.round,tempLength,false);
				}
			}
		}
	}

	render() {
		return (
			<div className="main-div">
				<div className="winner-div">
					{
						this.state.gameResult !== false && this.state.gameResult
					}
				</div>
				<div className="round-result-div">
					{
						this.state.players.map((row,id) => {
							return <Statues statues={row.shipInfo} playerCount={this.state.players.length} key={'result' + id}/>
						})
					}
				</div>
				<button 
					className="btn-new-game" 
					onClick={this.startGame}>
					New
				</button>
				<div className="ship-image-div">
					{
						this.state.players.map((row,id) => {
							return <Ship playerName={row.name} key={'shipImage' + id}/>
						})
					}
				</div>
			</div>
		);
	}
}

export default App;
