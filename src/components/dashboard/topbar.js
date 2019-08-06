import React from "react";
import firebase from "firebase/app";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

import { setPanel, setAcces, setType, setUser } from "../../actions/setPanel";
import { getDataInstagram, getDataFacebook } from "../../actions/setStats";

let profilePictures = [];
let usernames = [];
let type = [];
let accessTokens = [];
let pagesId = [];

let status;

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setPanel: () => dispatch(setPanel(status)),
  getDataInstagram: () =>
    dispatch(
      getDataInstagram(accessTokens[usernames.indexOf(cookies.get("account"))])
    ),
  getDataFacebook: () =>
    dispatch(
      getDataFacebook(
        pagesId[usernames.indexOf(cookies.get("account"))],
        accessTokens[usernames.indexOf(cookies.get("account"))]
      )
    ),
  setAcces: () =>
    dispatch(setAcces(accessTokens[usernames.indexOf(cookies.get("account"))])),
  setType: () =>
    dispatch(setType(type[usernames.indexOf(cookies.get("account"))])),
  setUser: () => dispatch(setUser(cookies.get("account")))
});

const cookies = new Cookies();

class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: "",
      account: "",
      popup: "",
      followers: ""
    };
  }
  addAccount() {
    this.setState({
      popup: true
    });
  }
  getAccounts() {
    this.setState({
      account: cookies.get("account")
    });
    let user = firebase.auth().currentUser.uid;
    let i = 0;
    firebase
      .firestore()
      .collection("users")
      .doc(user)
      .collection("accounts")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          profilePictures[i] = doc.data()["profilePicture"];
          usernames[i] = doc.data()["username"];
          type[i] = doc.data()["social"];
          accessTokens[i] = doc.data()["accessToken"];
          pagesId[i] = doc.data()["id"];
          i++;
        });
      })
      .then(() => {
        if (this.state.account !== undefined && this.state.account !== null) {
          if (type[usernames.indexOf(cookies.get("account"))] === "instagram")
            this.props.getDataInstagram();
          else if (
            type[usernames.indexOf(cookies.get("account"))] === "facebook"
          ) {
            this.props.getDataFacebook();
          }
          status = type[usernames.indexOf(cookies.get("account"))];
          this.props.setPanel();
        }
        var elems = document.querySelectorAll("ul .active");

        [].forEach.call(elems, function(el) {
          el.className = el.className.replace(/active\b/, "");
        });

        this.setState({
          loader: true
        });
        if (document.getElementById(this.state.account) !== null)
          document.getElementById(this.state.account).classList.add("active");
      });
  }
  componentWillMount() {
    if (
      cookies.get("account") !== null &&
      cookies.get("account") !== undefined
    ) {
      this.setState({
        account: cookies.get("account")
      });
      setTimeout(() => {
        this.props.setAcces();
        this.props.setType();
        this.props.setUser();
      }, 1000);
    } else {
      status = "nothing";
      this.props.setPanel();
    }
    this.getAccounts();
  }
  handleCheck(e) {
    cookies.set("account", e.currentTarget.id, { path: "/" });
    this.getAccounts();
    setTimeout(() => {
      this.props.setAcces();
      this.props.setType();
      this.props.setUser();
    }, 500);

    if (type[usernames.indexOf(cookies.get("account"))] === "instagram")
      this.props.getDataInstagram();
    else if (type[usernames.indexOf(cookies.get("account"))] === "facebook")
      this.props.getDataFacebook();
    /* fetch(
      `https://api.instagram.com/v1/users/self/media/recent/?access_token=${
        accessTokens[usernames.indexOf(cookies.get("account"))]
      }`
    )
      .then((res) => res.json())
      .then((result) => console.log(result));*/
  }

  render() {
    return (
      <div className="topbar">
        {this.state.popup === true && (
          <div className="popup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="popup__close"
              viewBox="0 0 24 24"
              onClick={function() {
                this.setState({ popup: false });
              }.bind(this)}
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="M9 9L15 15" />
              <path d="M15 9L9 15" />
            </svg>
            <h3>Which account would you like to add ?</h3>
            <div className="popup__buttons">
              <button
                className="btn instagram"
                onClick={() =>
                  (window.location.href =
                    "https://api.instagram.com/oauth/authorize/?client_id=c3ef63a1c9de41a1b6032a7c39e586ae&redirect_uri=http://localhost:3000/addaccountinstagram&response_type=token&instagram&scope=public_content")
                }
              >
                Instagram
              </button>
              <button
                className="btn facebook"
                onClick={() =>
                  (window.location.href =
                    "https://www.facebook.com/v4.0/dialog/oauth?response_type=token&client_id=2072731952831318&redirect_uri=http://localhost:3000/addaccountfacebook&auth_type=rerequest&scope=public_profile%2Cmanage_pages%2Cpages_messaging%2Cpages_show_list%2Cread_insights%2Cread_audience_network_insights%2Cpages_manage_cta")
                }
              >
                Facebook
              </button>
            </div>
          </div>
        )}
        {this.state.loader === true && (
          <ul dir="RTL">
            {profilePictures.map((val, indx) => (
              <li
                key={indx}
                id={usernames[indx]}
                className={indx}
                onClick={this.handleCheck.bind(this)}
              >
                <div className="topbar__list">
                  <img src={val} alt={usernames[indx]} />
                  <span className="topbar__icon">
                    {type[indx] === "instagram" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                      >
                        <defs>
                          <radialGradient
                            id="a"
                            cx="51.111"
                            cy="-2919.444"
                            r="163.552"
                            gradientTransform="matrix(.5 0 0 -.5 -16 -1395.5)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              data-name="layer1"
                              offset="0"
                              stopColor="#ffb140"
                            />
                            <stop
                              data-name="layer2"
                              offset="0.256"
                              stopColor="#ff5445"
                            />
                            <stop
                              data-name="layer3"
                              offset="0.599"
                              stopColor="#fc2b82"
                            />
                            <stop
                              data-name="layer4"
                              offset="1"
                              stopColor="#8e40b7"
                            />
                          </radialGradient>
                        </defs>
                        <path
                          fill="url(#a)"
                          d="M52.922 14.918a3.84 3.84 0 11-3.84-3.84 3.84 3.84 0 013.84 3.84zM32 42.668A10.667 10.667 0 1142.667 32 10.666 10.666 0 0132 42.667zm0-27.1A16.433 16.433 0 1048.433 32 16.432 16.432 0 0032 15.568zm0-9.8c8.545 0 9.556.03 12.93.186a17.7 17.7 0 015.943 1.1 9.916 9.916 0 013.68 2.394 9.908 9.908 0 012.394 3.68 17.714 17.714 0 011.1 5.942c.154 3.375.187 4.386.187 12.93s-.033 9.557-.187 12.932a17.7 17.7 0 01-1.1 5.942 10.6 10.6 0 01-6.074 6.074 17.714 17.714 0 01-5.942 1.1c-3.37.154-4.382.187-12.93.187s-9.554-.033-12.93-.187a17.7 17.7 0 01-5.94-1.1 9.916 9.916 0 01-3.68-2.394 9.914 9.914 0 01-2.394-3.68 17.714 17.714 0 01-1.1-5.942c-.154-3.375-.19-4.387-.19-12.932s.033-9.556.188-12.93a17.7 17.7 0 011.1-5.943 9.916 9.916 0 012.394-3.68 9.908 9.908 0 013.68-2.394 17.714 17.714 0 015.942-1.1c3.374-.153 4.385-.187 12.93-.187zM32 0c-8.69 0-9.78.037-13.194.192A23.487 23.487 0 0011.04 1.68a15.68 15.68 0 00-5.67 3.69 15.68 15.68 0 00-3.69 5.67 23.49 23.49 0 00-1.488 7.766C.037 22.22 0 23.31 0 32s.037 9.78.192 13.194A23.49 23.49 0 001.68 52.96a15.68 15.68 0 003.69 5.67 15.687 15.687 0 005.67 3.69 23.49 23.49 0 007.766 1.487c3.413.156 4.5.193 13.194.193s9.78-.037 13.194-.193a23.49 23.49 0 007.767-1.487 16.363 16.363 0 009.36-9.36 23.49 23.49 0 001.49-7.767C63.963 41.78 64 40.69 64 32s-.037-9.78-.193-13.194a23.49 23.49 0 00-1.487-7.767 15.687 15.687 0 00-3.69-5.67 15.687 15.687 0 00-5.67-3.69A23.49 23.49 0 0045.194.19C41.78.037 40.69 0 32 0z"
                        />
                      </svg>
                    )}
                    {type[indx] === "facebook" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                        </g>
                      </svg>
                    )}
                    {type[indx] === "twitter" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill-rule="nonzero"
                            d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131 4.718-.942 7.855-4.492 7.855-10.348 0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645-.335 1.64-.5 2.352-1.214 3.331 0 7.642-4.697 11.358-9.463 12.309-3.268.652-8.02-.419-9.382-1.841.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037 1.158.475 1.442.465 1.973.538z"
                          />
                        </g>
                      </svg>
                    )}
                  </span>
                </div>
              </li>
            ))}
            <li className="topbar__newAccount">
              {" "}
              <svg
                onClick={() => {
                  this.addAccount();
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-plus"
                viewBox="0 0 24 24"
              >
                <path d="M12 5L12 19" />
                <path d="M5 12L19 12" />
              </svg>
            </li>
          </ul>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar);
