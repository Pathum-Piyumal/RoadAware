import React from 'react';
import { useParams } from 'react-router-dom';

const HazardDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hazard Details</h1>
      <p>Viewing details for hazard ID: {id}</p>
    </div>
  );
};

export default HazardDetails;
