import React, { useEffect, useState } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import { getDropPointsApi } from '../services/api';

export default function Complaint() {
  const [dropPoints, setDropPoints] = useState([]);

  useEffect(() => {
    getDropPointsApi()
      .then(res => {
        if (res.data.success) {
          setDropPoints(res.data.dropPoints);
        }
      })
      .catch(err => console.warn(err));
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">GVMC E-Waste Complaint Portal</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Report overflowing bins, damaged collection kiosks, or illegal commercial e-waste dumping in Visakhapatnam
        </p>
      </div>

      <ComplaintForm dropPoints={dropPoints} />

    </div>
  );
}
