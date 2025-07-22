import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    idea: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 text-white flex flex-col justify-center p-10">
        <h1 className="text-3xl font-bold">SEND A MESSAGE TO OUR EXPERTS</h1>
        <p className="mt-4">Whether you want to develop a new product or update an existing one, we’re eager to assist. You’ll hear from us within one business day.</p>
        <div className="mt-6 border-l-4 border-white pl-4">
          <h3 className="text-lg font-bold">Call us to discuss your project:</h3>
          <p className="text-lg mt-2 font-semibold">+254 7000000000</p>
          <p className="text-sm">Call us 10 a.m. - 7 p.m.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">*Name:</label>
              <input type="text" name="name" onChange={handleChange} className="w-full border p-2 rounded" placeholder="Name, Company" required />
            </div>
            <div>
              <label className="block font-semibold">*Email:</label>
              <input type="email" name="email" onChange={handleChange} className="w-full border p-2 rounded" placeholder="name@example.com" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Phone / Skype:</label>
              <input type="text" name="phone" onChange={handleChange} className="w-full border p-2 rounded" placeholder="+X XXX XXX XXXX / Skype ID" />
            </div>
            <div>
              <label className="block font-semibold">Location:</label>
              <select name="location" onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select Location</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold">*Tell us about your idea:</label>
            <textarea name="idea" onChange={handleChange} className="w-full border p-2 rounded" placeholder="How can we help you?" required></textarea>
          </div>
          <div>
            <label className="block font-semibold">Upload any supporting documents you may have</label>
            <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white font-semibold p-3 rounded">SEND REQUEST</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
