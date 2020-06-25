import React from 'react';

class Ship extends React.Component {
    render(){
        return (
            <div className="ship-div">
                <span>
                    {this.props.playerName}
                </span>
            </div>
        );
    }
}

export default Ship;