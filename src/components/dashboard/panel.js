import React from "react";
import { connect } from "react-redux";
import { startAction } from "../../actions/startAction";

import Topbar from "./topbar";

const mapStateToProps = state => ({
    ...state
  });
  
  const mapDispatchToProps = dispatch => ({
    startAction: () => dispatch(startAction),
  });


class Panel extends React.Component {
  render() {
    return <div className="panel" ><Topbar/></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)