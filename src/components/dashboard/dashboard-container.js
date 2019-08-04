import React from 'react'

import Leftbar from './leftbar'
import Panel from './panel'

class Dashboard extends React.Component{
    componentDidMount(){
        console.log(this.props.load)
    }

    render(){
        return(
            <div className="dashboard">
                <Leftbar/>
                <Panel/>
            </div>
        )
    }
}
export default Dashboard