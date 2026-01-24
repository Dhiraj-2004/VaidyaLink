import React, { useState } from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);

  return (
    <form className="m-5 w-full">
      <p className="mb-6 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-xl w-full max-w-4xl">
        {/* Upload image */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="text-sm text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1">Doctor name</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Name"
              />
            </div>

            <div>
              <p className="mb-1">Doctor Email</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                placeholder="Your email"
              />
            </div>

            <div>
              <p className="mb-1">Doctor Password</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                placeholder="Password"
              />
            </div>

            <div>
              <p className="mb-1">Experience</p>
              <select className="w-full border rounded px-3 py-2">
                <option value="">Experience</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7 Years</option>
                <option value="8">8 Years</option>
                <option value="9">9 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>

            <div>
              <p className="mb-1">Fees</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                placeholder="Your fees"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1">Speciality</p>
              <select className="w-full border rounded px-3 py-2">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-1">Education</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Education"
              />
            </div>

            <div>
              <p className="mb-1">Address</p>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                placeholder="Address 1"
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
              />
            </div>

            <div>
              <p className="mb-1">Location</p>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                placeholder="Longitude"
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Altitude"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="mb-1 text-sm">About me</p>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Write about yourself"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 bg-primary px-8 py-2 rounded-full text-white text-sm"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
