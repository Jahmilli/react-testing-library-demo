import React from "react";
import { getUserDetails } from "../../logic/functions/userDetails";

const HomePage = () => {
  const [userDetails, setUserDetails] = React.useState({});

  React.useEffect(() => {
    const callGetUserDetails = async () => {
      try {
        const result = await getUserDetails();
        setUserDetails(result);
      } catch (err) {
        // handle error
      }
    };
    callGetUserDetails();
  }, []);

  return (
    <div>
      <h1>Welcome {userDetails.username}</h1>
    </div>
  );
};

export default HomePage;
