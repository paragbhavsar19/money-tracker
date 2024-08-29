import React from "react";

import TitleBar from "../Components/TitleBar";

import PillsTab from "../Components/PillsTab";
import { TabItem } from "flowbite-react";
import Setting from "./Setting";
import Profile from "./Profile";

const User = () => {
  return (
    <>
      <div id="titlebar">
        <TitleBar title="User"></TitleBar>
      </div>

      <PillsTab
        navclasses="sm:absolute top-3.5 z-0 my-3 w-full sm:my-0 dynamic"
        tabclasses="min-w-0 sm:min-w-[94px] sm:flex-1"
      >
        <TabItem title="Profile" className="max-h-fit sm:overflow-hidden">
          <Profile />
        </TabItem>
        <TabItem title="Setting" className="">
          <Setting />
        </TabItem>
      </PillsTab>
    </>
  );
};

export default User;
