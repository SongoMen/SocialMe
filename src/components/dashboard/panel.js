import React from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
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
      impressions: "",
      goal: ""
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
    if (prevProps.name !== this.props.name) {
      setTimeout(() => {
        this.getGoal();
      }, 1000);
      this.setState({
        goal: ""
      });
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.getGoal();
    }, 1000);
  }

  getGoal() {
    let user = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(user)
      .collection("accounts")
      .doc(this.props.name)
      .get()
      .then(doc => {
        if (doc.data() !== undefined) {
          this.setState({
            goal: doc.data()["goal"]
          });
        } else {
          this.setState({
            goal: "nothing"
          });
        }
      });
  }
  reLogin() {
    if (this.props.type === "instagram")
      window.location.href =
        "https://api.instagram.com/oauth/authorize/?client_id=c3ef63a1c9de41a1b6032a7c39e586ae&redirect_uri=http://localhost:3000/addaccountinstagram&response_type=token&instagram&scope=public_content";
    else if (this.props.type === "facebook")
      window.location.href =
        "https://www.facebook.com/v4.0/dialog/oauth?response_type=token&client_id=2072731952831318&redirect_uri=http://localhost:3000/addaccountfacebook&auth_type=rerequest&scope=public_profile%2Cmanage_pages%2Cpages_messaging%2Cpages_show_list%2Cread_insights%2Cread_audience_network_insights%2Cpages_manage_cta";
  }
  setGoalFacebook() {
    let user = firebase.auth().currentUser.uid;
    let goal = document.getElementById("goal").value;
    if (this.state.likes < goal) {
      firebase
        .firestore()
        .collection("users")
        .doc(user)
        .collection("accounts")
        .doc(this.props.name)
        .update({
          goal: goal
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    }
  }
  deleteAccount(){
    let user = firebase.auth().currentUser.uid;
    firebase.firestore().collection("users").doc(user).collection("accounts").doc(this.props.name).delete().then(()=>{
      window.location.href="/dashboard"
    })
  }
  render() {
    return (
      <div className="panel">
        <Topbar />
        <div className="panel-container">
          {this.props.panel === "instagram" && this.props.isLoading === false && (
            <div className="instagram">
              <h1>Instagram Overview</h1>
              <div className="instagram__row">
                <div className="box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
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
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
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
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
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
                    {this.state.goal === "" && (
                      <svg
                        className="loader"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        stroke="#fff"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g transform="translate(1 1)" strokeWidth="2">
                            <circle
                              strokeOpacity="0.5"
                              cx="18"
                              cy="18"
                              r="18"
                            />
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
                    {this.state.goal === "nothing" && (
                      <div>
                        <h2>Set you page likes goal !</h2>
                        <input
                          type="text"
                          id="goal"
                          placeholder="What's your goal ?"
                          className="box__goal"
                        />
                        <button
                          className="btn"
                          onClick={() => this.setGoalFacebook()}
                        >
                          SET
                        </button>
                      </div>
                    )}
                    {this.state.goal && this.state.goal !== "nothing" && (
                      <div>
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g data-name="Layer 2">
                            <g data-name="flag">
                              <polyline points="24 24 0 24 0 0" opacity="0" />
                              <path d="M19.27 4.68a1.79 1.79 0 0 0-1.6-.25 7.53 7.53 0 0 1-2.17.28 8.54 8.54 0 0 1-3.13-.78A10.15 10.15 0 0 0 8.5 3c-2.89 0-4 1-4.2 1.14a1 1 0 0 0-.3.72V20a1 1 0 0 0 2 0v-4.3a6.28 6.28 0 0 1 2.5-.41 8.54 8.54 0 0 1 3.13.78 10.15 10.15 0 0 0 3.87.93 7.66 7.66 0 0 0 3.5-.7 1.74 1.74 0 0 0 1-1.55V6.11a1.77 1.77 0 0 0-.73-1.43zM18 14.59a6.32 6.32 0 0 1-2.5.41 8.36 8.36 0 0 1-3.13-.79 10.34 10.34 0 0 0-3.87-.92 9.51 9.51 0 0 0-2.5.29V5.42A6.13 6.13 0 0 1 8.5 5a8.36 8.36 0 0 1 3.13.79 10.34 10.34 0 0 0 3.87.92 9.41 9.41 0 0 0 2.5-.3z" />
                            </g>
                          </g>
                        </svg>
                        <h1>{this.state.goal}</h1>
                        <h4>
                          You are {this.state.goal - this.state.likes} likes
                          away from your goal !
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
                <button className="btn delete" onClick={()=>this.deleteAccount()}>DELETE THIS ACCOUNT</button>

              </div>
            )}
          {this.props.isError === true && (
            <div className="error">
              <h2> An error has occured.</h2>
              <button className="btn" onClick={() => this.reLogin()}>
                Try to login again
              </button>
            </div>
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
