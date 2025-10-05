import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-8 lg:px-16'>
      {/* Hero Section */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      {/* Mission Section */}
      <div className='grid md:grid-cols-2 gap-10 items-center my-16'>
        <div className='order-2 md:order-1'>
          <div className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            Our Mission
          </div>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Transforming Healthcare Access</h2>
          <p className='text-gray-600 leading-relaxed mb-4'>
            Welcome to VaidyaLink, where we bridge the gap between patients and healthcare providers. We understand the challenges individuals face when scheduling appointments and managing health records.
          </p>
          <p className='text-gray-600 leading-relaxed mb-4'>
            Our platform integrates cutting-edge technology to deliver a seamless healthcare experience, making quality care accessible to everyone, everywhere.
          </p>
          
        </div>
        <div className='order-1 md:order-2'>
          <img className='w-full rounded-2xl shadow-xl' src={assets.about_image} alt="About VaidyaLink" />
        </div>
      </div>

      {/* Vision Section */}
      <div className='bg-gray-50 rounded-2xl p-8 sm:p-12 my-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            Our Vision
          </div>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Creating Seamless Healthcare Experiences</h2>
          <p className='text-gray-600 text-lg leading-relaxed'>
            Our vision at VaidyaLink is to revolutionize how people access healthcare. We aim to create a world where quality medical care is just a click away, empowering patients to take control of their health journey with confidence and ease.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='my-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-3'>Why Choose VaidyaLink?</h2>
          <p className='text-gray-600'>Discover what makes us different</p>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <div className='group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
            <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300'>
              <svg className='w-7 h-7 text-primary group-hover:text-white transition-colors duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Efficiency</h3>
            <p className='text-gray-600 leading-relaxed'>Streamlined appointment scheduling that fits into your busy lifestyle, saving you time and hassle.</p>
          </div>

          {/* Card 2 */}
          <div className='group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
            <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300'>
              <svg className='w-7 h-7 text-primary group-hover:text-white transition-colors duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Convenience</h3>
            <p className='text-gray-600 leading-relaxed'>Access to a network of trusted healthcare professionals in your area, available at your fingertips.</p>
          </div>

          {/* Card 3 */}
          <div className='group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
            <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300'>
              <svg className='w-7 h-7 text-primary group-hover:text-white transition-colors duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>Personalization</h3>
            <p className='text-gray-600 leading-relaxed'>Tailored recommendations and reminders to help you stay on top of your health journey.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About