import React from 'react'
import '../style/triphistory.css'
class TripHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tripSet: []
        };
    }

    componentDidMount() {
        console.log("grabbing has commenced")
        fetch("/trips/").then(res => res.text()).then(tripSet => this.setState({tripSet}, () => console.log('Trips grabbed:', tripSet)))
    }

    render() {
        return (
            <div className='triphistory'>
                <h1>Current User Trip History</h1>
                <br></br>
                    {
                        
                    /* {this.state.tripSet.map(function(listValue) {return <li>{listValue}</li>;})} //STUBBED OUT UNTIL DEVELOPMENT FOR JSON HANDLING HAS FINISHED */
                        <li class="tripList">{this.state.tripSet}</li>
                    }
            </div>
        );
    }
}



export default TripHistory