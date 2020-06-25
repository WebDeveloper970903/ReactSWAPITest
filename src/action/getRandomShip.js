import axios from "axios";

const getShip = async (round) => {
    let shipInfo;
    let flag = true;
    // loop until get correct speed ship
    while(flag) {
        await axios
        .get("https://swapi.dev/api/starships/" + Math.ceil(Math.random()*36) + "/")
        .then(res => {
            shipInfo = {state: "success", round: "Round " + round, shipName: res.data.name,shipSpeed: res.data.max_atmosphering_speed};
            if(parseInt(res.data.max_atmosphering_speed)) {
                flag = false;
            }
        })
        .catch(err =>{
            shipInfo = {state: "error"};
        });
    }

    return shipInfo;
};

export default getShip;