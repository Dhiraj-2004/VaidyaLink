import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const { backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();
  const [docImg, setDocImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "General physician",
    experience: "",
    education: "",
    fees: "",
    address1: "",
    address2: "",
    longitude: "",
    latitude: "",
    about: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image if selected
      if (docImg) {
        formDataToSend.append("image", docImg);
      }

      const { data } = await axios.post(
        backendUrl + "api/admin/doctors",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Doctor added successfully");
        navigate("/doctor-list");
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={handleSubmit}>
      <p className="mb-6 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-xl w-full max-w-4xl">
        {/* Upload image */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
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
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Email</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Password</p>
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <p className="mb-1">Experience</p>
              <select
                className="w-full border rounded px-3 py-2"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
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
                name="fees"
                placeholder="Your fees"
                value={formData.fees}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1">Speciality</p>
              <select
                className="w-full border rounded px-3 py-2"
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                required
              >
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
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <p className="mb-1">Address</p>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                name="address1"
                placeholder="Address 1"
                value={formData.address1}
                onChange={handleInputChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="address2"
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <p className="mb-1">Location</p>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                required
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
            name="about"
            placeholder="Write about yourself"
            value={formData.about}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-primary px-8 py-2 rounded-full text-white text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
