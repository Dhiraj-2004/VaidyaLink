import React, { useState } from 'react';
import { assets } from '../assets/assets';

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: 'richardjames@gmail.com',
    phone: '+12 347 8932',
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Church Road, London',
    },
    gender: 'Male',
    dob: '2000-01-20',
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (path, value) => {
    setUserData(prev => {
      if (path.startsWith('address.')) {
        const key = path.split('.')[1];
        return { ...prev, address: { ...prev.address, [key]: value } };
      }
      return { ...prev, [path]: value };
    });
  };

  const handleSave = () => {
    // call API to persist data if needed
    setIsEdit(false);
    console.log('Saved profile', userData);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-6">
        <div className="flex gap-6 items-center">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border">
            <img src={userData.image} alt={userData.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            {isEdit ? (
              <input
                className="w-full text-2xl font-semibold border-b pb-1 focus:outline-none"
                value={userData.name}
                onChange={e => handleChange('name', e.target.value)}
              />
            ) : (
              <h2 className="text-2xl md:text-3xl font-semibold">{userData.name}</h2>
            )}

            <p className="text-sm text-gray-500 mt-1">Patient / User Profile</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsEdit(prev => !prev)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                {isEdit ? 'Cancel' : 'Edit'}
              </button>

              {isEdit && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-95"
                >
                  Save information
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <h3 className="text-sm text-gray-600 mb-3">Contact Information</h3>

            <div className="space-y-3">
              <label className="block text-xs text-gray-500">Email</label>
              {isEdit ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
              ) : (
                <p className="text-sm text-gray-700">{userData.email}</p>
              )}

              <label className="block text-xs text-gray-500 mt-2">Phone</label>
              {isEdit ? (
                <input
                  value={userData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
              ) : (
                <p className="text-sm text-gray-700">{userData.phone}</p>
              )}

              <label className="block text-xs text-gray-500 mt-2">Address</label>
              {isEdit ? (
                <>
                  <input
                    value={userData.address.line1}
                    onChange={e => handleChange('address.line1', e.target.value)}
                    className="w-full rounded-md border px-3 py-2 mb-2"
                    placeholder="Address line 1"
                  />
                  <input
                    value={userData.address.line2}
                    onChange={e => handleChange('address.line2', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Address line 2"
                  />
                </>
              ) : (
                <p className="text-sm text-gray-700">{userData.address.line1}<br />{userData.address.line2}</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-sm text-gray-600 mb-3">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500">Gender</label>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={e => handleChange('gender', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-700">{userData.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Birthday</label>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={e => handleChange('dob', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                ) : (
                  <p className="text-sm text-gray-700">{new Date(userData.dob).toLocaleDateString()}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('You can wire this button to a delete or export action')}
                  className="text-xs underline text-gray-500"
                >
                  Export Profile
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 text-right text-xs text-gray-400">Last updated: just now</div>
      </div>
    </div>
  );
}
