import React from "react";
import firebase from "firebase/app";

let profilePictures = [];
let usernames = [];

export default class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: ""
    };
  }
  addInstagramAccount() {
    window.location.href =
      "https://api.instagram.com/oauth/authorize/?client_id=c3ef63a1c9de41a1b6032a7c39e586ae&redirect_uri=http://localhost:3000/dashboard&response_type=token";
  }
  getAccounts() {
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
          i++;
        });
      })
      .then(() => {
        this.setState({
          loader: true
        });
      });
  }
  componentWillMount() {
    let access_token = window.location.href.split("=")[1];
    let user = firebase.auth().currentUser.uid;

    if (window.location.href.includes("access_token")) {
      fetch(
        `https://api.instagram.com/v1/users/self/?access_token=${access_token}`
      )
        .then(res => res.json())
        .then(result => {
          console.log(result);
          firebase
            .firestore()
            .collection("users")
            .doc(user)
            .collection("accounts")
            .doc(result.data.username)
            .set({
              accessToken: access_token,
              profilePicture: result.data.profile_picture,
              username: result.data.username
            })
            .catch(error => {
              console.log("Error getting document:", error);
            });
        })
        .catch(err => console.log(err));
    }
    this.getAccounts();
    console.log(profilePictures);
    this.getAccounts();
  }
  render() {
    return (
      <div className="topbar">
        {this.state.loader === true && (
          <ul dir="RTL">
            {profilePictures.map((val, indx) => (
              <li key={indx}>
                <div className="topbar__list">
                  <img src={val} alt={usernames[indx]} />
                  <span className="topbar__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
                  </span>
                </div>
              </li>
            ))}
            <li className="topbar__newAccount">
              {" "}
              <svg
                onClick={() => {
                  this.addInstagramAccount();
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
