import React from "react";
import firebase from "firebase/app";

const AddAccountInstagram = () => {
  let access_token = window.location.href.split("=")[1];
  let user = firebase.auth().currentUser.uid;

  if (window.location.href.includes("access_token")) {
    fetch(
      `https://api.instagram.com/v1/users/self/?access_token=${access_token}`
    )
      .then(res => res.json())
      .then(result => {
        firebase
          .firestore()
          .collection("users")
          .doc(user)
          .collection("accounts")
          .doc(result.data.username)
          .set({
            accessToken: access_token,
            profilePicture: result.data.profile_picture,
            username: result.data.username,
            social: "instagram"
          })
          .then(() => {
            window.location.href = "/dashboard";
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="addAccount">
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
      <h3>Wait a second, we are setting everything up !</h3>
    </div>
  );
};

export default AddAccountInstagram;
