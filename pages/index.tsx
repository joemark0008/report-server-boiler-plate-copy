import React, { useEffect, useState } from "react";
import AccessManager from "../components/accessControl/AccessManager";
import AppAnnouncement from "../components/announcement/Announcement";

const Home = () => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else
    return (
      <AccessManager roles={["USER", "ADMIN"]}>
        <AppAnnouncement />
      </AccessManager>
    );
};

export default Home;
