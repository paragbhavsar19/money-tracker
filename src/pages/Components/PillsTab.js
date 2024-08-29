import React, { useState } from "react";

const PillsTab = ({ children, navclasses = "", tabclasses = "" }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className={`${navclasses}`} id="pillsTab">
        <ul className="gap-3 flex justify-center bg-[#EEEEF1]  w-max mx-auto p-1 text-center rounded-lg ">
          {React.Children.map(children, (child, index) => (
            <li
              className={` ${tabclasses} hover:cursor-pointer px-1.5 py-1 whitespace-nowrap ${
                index === activeTab
                  ? "selected bg-[#ffffff]  rounded-lg  text-[#1C1D22] "
                  : "text-[#8b8b8b] "
              }`}
              onClick={() => setActiveTab(index)}
            >
              {child.props.title}
            </li>
          ))}
        </ul>
      </div>

      {React.Children.toArray(children)[activeTab]}
    </>
  );
};

export default PillsTab;
