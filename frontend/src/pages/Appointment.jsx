import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {

  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const dayWords = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetechDocInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  const getAvailableSlots = () => {
    setDocSlots([])

    // Getting current date
    let today = new Date();
    for(let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0); // Setting end time to 09:00 PM

      if(today.getDate() === currentDate.getDate()) {
       currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10); // Setting start time to current hour or 10 AM
       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime) {
        let timeLabel = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add time slots to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: timeLabel
        });

        // Incrementing current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
        
      }

      setDocSlots(prevSlots => [...prevSlots, timeSlots]);
    
    }
  }

  useEffect(() => {
    fetechDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && (
    <div>
      {/* Doctor Details Section */}
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* Doctor Image */}
        <div className='w-full sm:w-auto'>
          <img 
            className='bg-primary w-full sm:max-w-72 rounded-lg shadow-lg object-cover' 
            src={docInfo.image} 
            alt={docInfo.name} 
          />
        </div>

        {/* Doctor Information Card */}
        <div className='flex-1 border border-gray-200 rounded-lg p-8 py-7 bg-white shadow-md mx-2 sm:mx-0 mt-[-80px] sm:mt-0 hover:shadow-lg transition-shadow duration-300'>
          {/* Doctor Name & Verification */}
          <div className='flex items-center gap-2 mb-3'>
            <p className='text-2xl font-semibold text-gray-800'>{docInfo.name}</p>
            <img className='w-5 h-5' src={assets.verified_icon} alt="Verified" />
          </div>

          {/* Credentials */}
          <div className='flex items-center gap-2 text-sm text-gray-600 mb-4'>
            <p className='font-medium'>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-1 px-3 border border-gray-300 text-xs rounded-full bg-gray-50 hover:bg-gray-100 transition-colors'>
              {docInfo.experience}
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 my-4'></div>

          {/* About Section */}
          <div className='mb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <p className='text-base font-semibold text-gray-800'>About</p>
              <img className='w-4 h-4' src={assets.info_icon} alt="Info" />
            </div>
            <p className='text-sm text-gray-600 max-w-[700px] leading-relaxed'>
              {docInfo.about}
            </p>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 my-4'></div>

          {/* Fee Information */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium text-gray-700'>Appointment Fee:</p>
              <span className='text-lg font-semibold text-primary'>
                {currencySymbol}{docInfo.fees}
              </span>
            </div>

            {/* Distance Information */}
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium text-gray-700'>Distance:</p>
              <span className='text-lg font-semibold text-blue-600'>
                {docInfo.distance} km
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className='sm:ml-72 sm:pl-4 mt-4'>
        <p className='text-xl font-semibold text-gray-800 mb-4'>Booking slots</p>
        
        {/* Date Selection */}
        <div className='flex gap-3 items-center overflow-x-scroll scrollbar-hide'>
          {
            docSlots.length && docSlots.map((slots, index) => (
              <div 
                key={index} 
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
              >
                <p className={`text-sm font-medium ${slotIndex === index ? 'text-white' : 'text-gray-600'}`}>
                  {slots[0] && dayWords[slots[0].dateTime.getDay()]}
                </p>
                <p className={`text-lg font-semibold ${slotIndex === index ? 'text-white' : 'text-gray-800'}`}>
                  {slots[0] && slots[0].dateTime.getDate()}
                </p>
              </div>
            ))
          }
        </div>

        {/* Time Slot Selection */}
        <div className='flex gap-3 items-center mt-6 overflow-x-scroll scrollbar-hide'>
          {
            docSlots.length && docSlots[slotIndex].map((slot, index) => (
              <p 
                key={index}
                onClick={() => setSlotTime(slot.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time === slotTime ? 'bg-primary text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        {/* Book Appointment Button */}
        <button className='bg-primary text-white text-sm font-medium px-14 py-3 rounded-full mt-8 hover:scale-105 transition-all'>
          Book an appointment
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment