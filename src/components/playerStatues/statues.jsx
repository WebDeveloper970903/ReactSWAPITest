import React from 'react';

class Statues extends React.Component {
    render(){
        return (
            <div style={{
                    width: 100/this.props.playerCount+'vw',
                    padding: '0 1em'
                }}>
                {
                    this.props.statues.map((row,key) => {
                        return (
                            <div key={key}>
                                {row.round}: {row.shipName} - {row.shipSpeed}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Statues;