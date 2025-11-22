import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-2">

      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      <div className="mt-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_auto] gap-4 sm:flex sm:gap-6 py-4 border-b"
          >
            {/* Doctor Image */}
            <div>
              <img
                src={item.image}
                alt=""
                className="w-32 rounded-lg bg-indigo-50"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>

              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                25, July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 justify-center">
              <button className="text-sm min-w-48 py-2 border rounded-md hover:bg-primary hover:text-white transition-all">
                Pay Online
              </button>

              <button className="text-sm min-w-48 py-2 border rounded-md hover:bg-red-600 hover:text-white transition-all">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyAppointments;
