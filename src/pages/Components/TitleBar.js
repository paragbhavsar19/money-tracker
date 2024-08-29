import React from "react";
import { Link } from "react-router-dom";
import { BackIcon } from "../../images";

const TitleBar = ({ backbutton = false, backlink = "/", title, children }) => {
  return (
    <div className="h-16 border-b w-full flex justify-between items-center px-6" id="titleBar">
      <div className="text-black text-lg font-medium flex items-center uppercase">
        {backbutton && (
          <Link
            to={backlink}
            className="font-medium z-10 block  mr-2 cursor-pointer text-light-iconColor dark:text-white relative top-[1px]"
          >
            <BackIcon />
          </Link>
        )}
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TitleBar;
