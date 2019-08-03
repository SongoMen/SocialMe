import React from 'react'

import Leftbar from './leftbar'
import Topbar from './topbar'

export default class Dashboard extends React.Component{

    render(){
        return(
            <div className="dashboard">
                <Leftbar/>
                <div className="panel">
                    <Topbar/>
                </div>
            </div>
        )
    }
}