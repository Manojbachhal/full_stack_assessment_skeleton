import React from "react";
import { EditModalProps } from "../interfaces/interfaces";

const EditModal = ({
  isOpen,
  selectedHome,
  relatedUsers = [],
  initialCheckedUsernames,
  isLoading,
  isUpdating,
  errorMessage,
  onCheckboxChange,
  onUpdate,
  onClose,
}: EditModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Users for {selectedHome}</h2>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadowloading"></div>
              <div className="shadowloading"></div>
              <div className="shadowloading"></div>
              <h1 className="m-auto text-center">Loading...</h1>
            </div>
          </div>
        ) : (
          <div>
            {relatedUsers.length > 0 ? (
              relatedUsers.map((user) => (
                <div key={user.username} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={initialCheckedUsernames[user.username] || false}
                      onChange={() => onCheckboxChange(user.username)}
                      className="mr-2"
                    />
                    {user.username}
                  </label>
                </div>
              ))
            ) : (
              <p>No related users found.</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex justify-end mt-4">
              <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button
                onClick={onUpdate}
                disabled={errorMessage != ""}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              >
                {isUpdating ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditModal;
