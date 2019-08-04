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
  render() {
    return (
      <div className="panel">
        <Topbar />
        <div className="panel-container">
          {this.props.panel === "instagram" &&
          this.props.isLoading === false ? (
            <div className="instagram">
              <h1>Instagram Overview</h1>
              <div className="instagram__row">
                <div className="instagram__box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g data-name="Layer 2">
                      <g data-name="people">
                        <rect width="24" height="24" opacity="0" />
                        <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                        <path d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
                        <path d="M17 14a5 5 0 0 0-3.06 1.05A7 7 0 0 0 2 20a1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 6.9 6.9 0 0 0-.86-3.35A3 3 0 0 1 20 19a1 1 0 0 0 2 0 5 5 0 0 0-5-5z" />
                      </g>
                    </g>
                  </svg>
                  <h1>{this.props.info}</h1>
                  <h4>Total Followers</h4>
                </div>
              </div>
            </div>
          ) : (
            <svg
              className="loader"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              stroke="#fff"
            >
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
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
