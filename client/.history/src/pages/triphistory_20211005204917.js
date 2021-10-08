import React from 'react'

function TripHistory() {
    return (
        <Router>
            <Switch>
            <Route path = '/' exact component={Home}/>
            <Route path = '/triphistory' component={TripHistory}/>
            <Route path = '/gasefficiencyreports' component={Reports}/>
            <Route path = '/userprofile' component={UserProfile}/>
            </Switch>
        </Router>
    )
}

export default TripHistory