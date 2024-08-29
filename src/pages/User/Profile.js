import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    phone: false,
    password: false,
    accountCreationDate: false,
  });

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "(555) 555-5555",
    password: "********",
    accountCreationDate: "01/01/2020",
  });

  const handleInputFocus = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleInputBlur = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleChange = (e, field) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <div className="px-6 mt-6">
        <form>
          <p className="text-sm text-[#6E7387] mb-7">Personal Info</p>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">First Name</div>
            <div className="min-w-80">
              <input
                value={profileData.firstName}
                readOnly={!editMode.firstName}
                onFocus={() => handleInputFocus("firstName")}
                onBlur={() => handleInputBlur("firstName")}
                onChange={(e) => handleChange(e, "firstName")}
                className={`${
                  editMode.firstName ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">Last Name</div>
            <div className="min-w-80">
              <input
                value={profileData.lastName}
                readOnly={!editMode.lastName}
                onFocus={() => handleInputFocus("lastName")}
                onBlur={() => handleInputBlur("lastName")}
                onChange={(e) => handleChange(e, "lastName")}
                className={`${
                  editMode.lastName ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">Username</div>
            <div className="min-w-80">
              <input
                value={profileData.username}
                readOnly={!editMode.username}
                onFocus={() => handleInputFocus("username")}
                onBlur={() => handleInputBlur("username")}
                onChange={(e) => handleChange(e, "username")}
                className={`${
                  editMode.username ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">Email</div>
            <div className="min-w-80">
              <input
                value={profileData.email}
                readOnly={!editMode.email}
                onFocus={() => handleInputFocus("email")}
                onBlur={() => handleInputBlur("email")}
                onChange={(e) => handleChange(e, "email")}
                className={`${
                  editMode.email ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">Phone</div>
            <div className="min-w-80">
              <input
                value={profileData.phone}
                readOnly={!editMode.phone}
                onFocus={() => handleInputFocus("phone")}
                onBlur={() => handleInputBlur("phone")}
                onChange={(e) => handleChange(e, "phone")}
                className={`${
                  editMode.phone ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <p className="text-sm text-[#6E7387] mb-7 pt-6">
            Account Information
          </p>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">Password</div>
            <div className="min-w-80">
              <input
                value={profileData.password}
                readOnly={!editMode.password}
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
                onChange={(e) => handleChange(e, "password")}
                className={`${
                  editMode.password ? "border h-9" : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-44 text-sm text-[#1C1D22]">
              Account Creation Date
            </div>
            <div className="min-w-80">
              <input
                value={profileData.accountCreationDate}
                readOnly={!editMode.accountCreationDate}
                onFocus={() => handleInputFocus("accountCreationDate")}
                onBlur={() => handleInputBlur("accountCreationDate")}
                onChange={(e) => handleChange(e, "accountCreationDate")}
                disabled
                className={`${
                  editMode.accountCreationDate
                    ? "border-none h-9"
                    : "border-none h-9"
                } rounded-md px-2 w-full`}
              />
            </div>
          </div>

          <div className="h-16 border-t absolute bottom-0 left-0 w-full flex items-center px-4">
            <button className="w-24 text-base bg-green-600 text-white py-1.5 rounded-md font-medium mr-6">
              Save
            </button>
            <Link
              className="w-24 py-1.5 rounded-md font-medium hover:bg-gray-200 hover:no-underline hover:text-black text-center"
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
