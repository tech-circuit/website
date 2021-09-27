import "../styles/profile.css";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";

const Profile = () => {
  const [tab, setTab] = useState("Your Info");

  return (
    <>
      <header className="head-2 profile-tabs">
        <div className="left-tabs">
          <h3
            onClick={(eve) => changeTab(eve)}
            className={tab === "Your Info" ? "profile-tab-active" : ""}
          >
            Your Info
          </h3>
          <h3
            className={tab === "Projects" ? "profile-tab-active" : ""}
            onClick={(eve) => changeTab(eve)}
          >
            Projects
          </h3>
          <h3
            className={tab === "Drafts" ? "profile-tab-active" : ""}
            onClick={(eve) => changeTab(eve)}
          >
            Drafts
          </h3>
          <h3
            className={tab === "Your Posts" ? "profile-tab-active" : ""}
            onClick={(eve) => changeTab(eve)}
          >
            Your Posts
          </h3>
          <h3
            className={tab === "Saved Posts" ? "profile-tab-active" : ""}
            onClick={(eve) => changeTab(eve)}
          >
            Saved Posts
          </h3>
          <h3
            className={tab === "Notifications" ? "profile-tab-active" : ""}
            onClick={(eve) => changeTab(eve)}
          >
            Notifications
          </h3>
        </div>
        <div className="right-tabs">
          <h3>Logout</h3>
        </div>
      </header>

      {/* TABS ------------------------------------------------------------------------------------------------ */}

      <div className="container">
        {tab === "Your Info" ? <ProfileInfo /> : ""}
      </div>
    </>
  );

  function changeTab(e) {
    setTab(e.target.textContent);
  }
};

export default Profile;
