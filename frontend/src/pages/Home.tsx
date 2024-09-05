import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useGetRelatedUsersQuery,
  useUpdateHomeUsersMutation,
} from "../store/api";
import UserSelect from "../components/UserSelect";
import HomeCard from "../components/HomeCard";
import Pagination from "../components/Pagination";
import EditModal from "../components/EditModal";

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedHome, setSelectedHome] = useState<string>("");
  const [initialCheckedUsernames, setInitialCheckedUsernames] = useState<{
    [username: string]: boolean;
  }>({});

  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: homesData = [], isLoading: isLoadingHomes } = useGetHomesByUserQuery(
    { user: selectedUser, page },
    { skip: !selectedUser }
  );
  const { refetch: refetchHomes } = useGetHomesByUserQuery(
    { user: selectedUser, page },
    { skip: !selectedUser }
  );

  const { data: relatedUsers, isLoading: isLoadingRelatedUsers } = useGetRelatedUsersQuery(
    selectedHome,
    { skip: !selectedHome }
  );

  const [updateHomeUsers, { isLoading: isUpdating }] = useUpdateHomeUsersMutation();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
    setPage(1);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? Math.max(prevPage - 1, 1) : prevPage + 1));
  };

  useEffect(() => {
    if (selectedHome && relatedUsers && relatedUsers.length > 0) {
      setIsModalOpen(true);

      const initialCheckedState = relatedUsers.reduce<{ [username: string]: boolean }>(
        (acc, user) => {
          acc[user.username] = true;
          return acc;
        },
        {}
      );

      setInitialCheckedUsernames(initialCheckedState);
    }
  }, [selectedHome, relatedUsers]);

  const openEditModal = (streetAddress: string) => {
    setSelectedHome(streetAddress);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHome("");
    setErrorMessage("");
  };

  const handleCheckboxChange = (username: string) => {
    setInitialCheckedUsernames((prevState) => {
      const newCheckedUsernames = {
        ...prevState,
        [username]: !prevState[username],
      };

      const selectedUsers = Object.keys(newCheckedUsernames).filter((u) => newCheckedUsernames[u]);
      setErrorMessage(selectedUsers.length === 0 ? "At least one user must be selected." : "");

      return newCheckedUsernames; // Update state correctly
    });
  };

  const handleUpdateUser = async () => {
    const selectedUsers = Object.keys(initialCheckedUsernames).filter(
      (username) => initialCheckedUsernames[username]
    );

    if (selectedUsers.length === 0) {
      setErrorMessage("At least one user must be selected.");
      return;
    }

    try {
      await updateHomeUsers({
        users: selectedUsers,
        street_address: selectedHome,
      }).unwrap();

      // Refetch homes and related users to reflect changes
      refetchHomes();
      // refetchRelatedUsers();

      closeModal();
    } catch (error) {
      console.error("Error updating users:", error);
      setErrorMessage("Failed to update users. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <UserSelect selectedUser={selectedUser} users={users} onUserChange={handleUserChange} />

      {isLoadingHomes || isLoadingUsers ? (
        <div className="max-w-screen-xl h-[80vh] flex flex-col items-center justify-center">
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
        ""
      )}

      {homesData.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Homes for {selectedUser}</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 py-4">
            {homesData[0].homes.map((home) => (
              <HomeCard key={home.streetAddress} home={home} onEditClick={openEditModal} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={homesData[0].totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <h1>nothing to show here</h1>
        </div>
      )}

      <EditModal
        isOpen={isModalOpen}
        selectedHome={selectedHome}
        relatedUsers={relatedUsers}
        initialCheckedUsernames={initialCheckedUsernames}
        isLoading={isLoadingRelatedUsers}
        isUpdating={isUpdating}
        errorMessage={errorMessage}
        onCheckboxChange={handleCheckboxChange}
        onUpdate={handleUpdateUser}
        onClose={closeModal}
      />
    </div>
  );
};

export default React.memo(Home);
