import React from "react";
import { connect } from "react-redux";
import { setPanel } from "../../actions/setPanel";

import Topbar from "./topbar";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setPanel: () => dispatch(setPanel)
});

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: "",
      impressions: ""
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.facebookInfo !== this.props.facebookInfo) {
      if (this.props.facebookInfo.length > 0)
        this.setState({
          likes: this.props.facebookInfo[0].values[
            this.props.facebookInfo[0].values.length - 1
          ].value,
          impressions: this.props.facebookInfo[4].values[
            this.props.facebookInfo[4].values.length - 1
          ].value
        });
    }
  }
  render() {
    console.log(this.props.facebookInfo);
    return (
      <div className="panel">
        <Topbar />
        <div className="panel-container">
          {this.props.panel === "instagram" && this.props.isLoading === false && (
            <div className="instagram">
              <h1>Instagram Overview</h1>
              <div className="instagram__row">
                <div className="box">
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
                  <h1>{this.props.instagramInfo}</h1>
                  <h4>Total Followers</h4>
                </div>
              </div>
            </div>
          )}
          {this.props.isLoading === true && this.props.panel !== "nothing" && (
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
          {this.props.panel === "nothing" && (
            <h3 className="error">
              Please first choose an account at the top right corner.
            </h3>
          )}
          {this.props.panel === "facebook" &&
            this.props.isError !== true &&
            this.props.isLoading === false &&
            this.props.facebookInfo.length > 0 && (
              <div className="facebook">
                <h1>Facebook Overview</h1>
                <div className="facebook__row">
                  <div className="box">
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
                    <h1>{this.state.likes}</h1>
                    <h4>Total Page Likes</h4>
                  </div>
                  <div className="box">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g data-name="Layer 2">
                        <g data-name="activity">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(90 12 12)"
                            opacity="0"
                          />
                          <path d="M14.33 20h-.21a2 2 0 0 1-1.76-1.58L9.68 6l-2.76 6.4A1 1 0 0 1 6 13H3a1 1 0 0 1 0-2h2.34l2.51-5.79a2 2 0 0 1 3.79.38L14.32 18l2.76-6.38A1 1 0 0 1 18 11h3a1 1 0 0 1 0 2h-2.34l-2.51 5.79A2 2 0 0 1 14.33 20z" />
                        </g>
                      </g>
                    </svg>{" "}
                    <h1>{this.state.impressions}</h1>
                    <h4>Page Impressions in last 28 days</h4>
                  </div>
                  <div className="box">
                    <h4>Set you page likes goal !</h4>
                  </div>
                </div>
              </div>
            )}
          {this.props.isError === true && (
            <h2 className="error"> An error has occured.</h2>
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
