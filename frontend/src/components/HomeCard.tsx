import React from "react";
import { HomeCardProps } from "../interfaces/interfaces";

const HomeCard = ({ home, onEditClick }: HomeCardProps) => {
  return (
    <div
      key={home.streetAddress}
      className="border p-4 rounded shadow flex flex-col gap-3 hover:shadow-2xl"
    >
      <h3 className="font-bold text-md">{home.streetAddress}</h3>
      <div className="text-sm">
        <p>Price: ${home.listPrice}</p>
        <p>State: {home.state}</p>
        <p>ZIP: {home.zip}</p>
        <p>Sqft: {home.sqft}</p>
        <p>Beds: {home.beds}</p>
        <p>Baths: {home.baths}</p>
      </div>
      <button
        onClick={() => onEditClick(home.streetAddress)}
        className="mt-2 bg-blue-500 w-1/2 text-white px-2 text-sm py-2 rounded"
      >
        Edit Users
      </button>
    </div>
  );
};

export default HomeCard;
