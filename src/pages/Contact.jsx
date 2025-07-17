import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">Contact CarePoint Hospital</h1>
        <p className="mt-2 text-gray-600 text-lg">Your Health. Our Priority.</p>
      </div>

      {/* Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">📞 Get in Touch</h2>
          <p><strong>Phone:</strong> +977-1-1234567 | +977-9800000000</p>
          <p><strong>Email:</strong> info@carepointhospital.com</p>
          <p><strong>Address:</strong> Baneshwor, Kathmandu, Nepal</p>
          <div>
            <h2 className="text-xl font-semibold mt-6 text-blue-600">🗓️ Visiting Hours</h2>
            <p>Sun – Fri: 8:00 AM – 6:00 PM</p>
            <p>Sat: 9:00 AM – 3:00 PM</p>
            <p>Emergency: 24/7</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <input type="text" placeholder="Your Full Name" className="w-full border p-3 rounded-md" required />
          <input type="email" placeholder="Your Email Address" className="w-full border p-3 rounded-md" required />
          <input type="text" placeholder="Subject" className="w-full border p-3 rounded-md" required />
          <textarea placeholder="Your Message" className="w-full border p-3 rounded-md h-32 resize-none" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600"> Locate Us</h2>
        <iframe
          src="https://www.google.com/maps?q=baneshwor,%20kathmandu&output=embed"
          width="100%"
          height="350"
          className="rounded-xl shadow-md border"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact