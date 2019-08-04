import React from "react";
import { connect } from "react-redux";
import { InstagramPanel } from "../../actions/instagramPanel";
import { FacebookPanel } from "../../actions/facebookPanel";

import Topbar from "./topbar";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  InstagramPanel: () => dispatch(InstagramPanel),
  FacebookPanel: () => dispatch(FacebookPanel)
});

class Panel extends React.Component {
  componentDidMount(){
    setInterval(() => {
      console.log(this.props.panel)
    }, 100);
  }
  render() {
    return (
      <div className="panel">
        <Topbar />
        <div className="panel-container">
          {this.props.panel === "instagram" && (
            <div className="instagram">
              <h1>Instagram Overview</h1>
              <div className="instagram__row">
                {this.props.isLoading ? (
                  <svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity="0.5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <div className="instagram__box" >{this.props.info}</div>
                )}
              </div>
            </div>
          )}
          {this.props.panel === "facebook" && <h1>fb</h1>}{" "}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
