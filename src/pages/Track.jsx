import Button from "../components/Button";

import { useDispatch, useSelector } from 'react-redux'

import Loader from "../components/Loader"
import { useState } from "react";

import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";

import { BiSolidCar } from "react-icons/bi";

import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { FiMapPin, FiFileText, FiDatabase, FiSend } from "react-icons/fi";

function TrackPage({listings ,isLoading}) {

const [isAccordionOpen, setIsAccordionOpen] = useState(false);
const [isAccordionSOpen, setIsAccordionSOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };


  const toggleSAccordion = () => {

    setIsAccordionSOpen(!isAccordionSOpen);

  };

  return (
    <>
 
 <div className="w-full h-[750px] sm:h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] relative">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.google.com/maps/d/embed?mid=1_Cp21MB7Zkf-jo6E9rvuvX5fP6E&ehbc=2E312F"
    frameBorder="0"
    allowFullScreen=""
    aria-hidden="false"
    tabIndex="0"
  ></iframe>
</div>





<main className="">





<div className="max-w-7xl mx-auto px-8 sm:px-16 flex flex-col items-center justify-center text-center px-6 sm:px-12 py-12">

  <p className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed">
    Our platform helps you track & trace your product's supply chain from its source to the end consumer.
We design end-to-end traceability solutions that are designed to assist you in gathering trusted data to report on your sustainability, and ensure your compliance with regulations. 
  </p>

  <button className="mt-8 px-8 py-4 text-lg button text-white rounded-lg">Get a demo</button>
</div>



<div className="bg">
 <h2 className="text-center text-4xl sm:text-5xl font-semibold pb-5 text-gray-900">
    Our solutions
  </h2>

<section className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 py-4  sm:px-12">


  <div className="w-full text-center p-6 flex flex-col items-center">
    <FiFileText className="w-10 h-10 mb-4 text-blue-600" />
    <p className="text-base sm:text-lg font-normal">
      <strong>Auditable Product Traceability</strong><br />
      End-to-end batch-level traceability on product traces for regulatory compliance. Leveraging industry standards for data exchange.
    </p>
  </div>

  {/* Card 2 */}
  <div className="w-full text-center p-6 flex flex-col items-center">
    <FiMapPin className="w-10 h-10 mb-4 text-green-600" />
    <p className="text-base sm:text-lg font-normal">
      <strong>Centralised Geolocation Data</strong><br />
      Collect and manage supply chain location data, including GPS coordinates and polygons, in one place.
    </p>
  </div>


  {/* Card 4 */}
  <div className="w-full text-center p-6 flex flex-col items-center">
    <FiDatabase className="w-10 h-10 mb-4 text-purple-600" />
    <p className="text-base sm:text-lg font-normal">
      <strong>Data Storage and Access for Audits</strong><br />
      Easily Access and manage all DDS submissions and records, ensuring secure and reliable traceability data
    </p>
  </div>

</section>

</div>




<div className="w-full h-[750px] sm:h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] bg-cover bg-center flex items-center  sm:px-12 " 
  >
  
  {/* Content Section */}
  <div className="flex flex-col lg:flex-row items-center justify-between w-full">
    
    {/* Left - Text Section */}
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-snug sm:leading-tight">
      Blockchain-backed traceability
      </h2>
   
      <p className="mt-6 text-lg sm:text-xl leading-relaxed">
      Our blockchain-backed traceability provides data security, immutability and fine grained access control. The use of GS1 standard data format allows interoperability with existing IT infrastructure.
We are offering off-the-shelf options and subscription-based models.
      </p>
      <button className="mt-8 px-8 py-4 text-lg button text-white rounded-lg">Lets chat!</button>
    </div>

    {/* Right - Image Section (Hidden on small screens) */}
    <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 hidden sm:block">
     <iframe src="https://www.google.com/maps/d/embed?mid=1_Cp21MB7Zkf-jo6E9rvuvX5fP6E&ehbc=2E312F" width="640" height="480"></iframe>
    </div>

  </div>
</div>





<div className="bg">
 <h2 className="text-center text-4xl sm:text-5xl font-semibold pb-5 text-gray-900">
    The technology behind what we do
  </h2>
      <p className="text-center text-lg sm:text-xl text-gray-700  leading-relaxed">
   At DashDelivery, we embrace agile and customer-centric software development, we focus on the solution-layer of the software stack, and work with partners when it comes to specialisation. Some of the technologies we use:
  </p>

<section className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 py-4  sm:px-12">


  <div className="w-full text-center p-6 flex flex-col items-center">
  <img className="w-36 h-36 object-cover" src="/images/redis.webp" alt="Second Image" />

    <p className="text-base sm:text-lg font-normal">
      <strong>Redis</strong><br />
     The Real-time Data Platform
    </p>
  </div>

  {/* Card 2 */}
  <div className="w-full text-center p-6 flex flex-col items-center">
     <img className="w-36 h-36 object-cover" src="/images/post.png" alt="Second Image" />
    <p className="text-base sm:text-lg font-normal">
      <strong>PostgreSQL</strong><br />
      The world's most advanced open source database
    </p>
  </div>


  {/* Card 4 */}
  <div className="w-full text-center p-6 flex flex-col items-center">
    <img className="w-36 h-36 object-cover" src="/images/docker.webp" alt="Second Image" />
    <p className="text-base sm:text-lg font-normal">
      <strong>Docker</strong><br />
      Accelerated Container Application Development
    </p>
  </div>

    <div className="w-full text-center p-6 flex flex-col items-center">
    <img className="w-36 h-36 object-cover" src="/images/celery.png" alt="Second Image" />
    <p className="text-base sm:text-lg font-normal">
      <strong>Celery</strong><br />
     Distributed Task Queue
    </p>
  </div>

</section>

</div>






<div className="w-full h-[750px] sm:h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] bg-cover bg-center flex items-center  sm:px-12 " 
  >
  
  {/* Content Section */}
  <div className="flex flex-col lg:flex-row items-center justify-between w-full">
    
    {/* Left - Text Section */}
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-snug sm:leading-tight">
    Customer centric solutions for your business
      </h2><br />
      <strong>Digitalization and Centralization</strong><br />
   
      <p className="mt-6 text-lg sm:text-xl leading-relaxed">
   Our end-to-end traceability solutions enable the digitalization and centralization of data, addressing operational challenges and building trust across the entire supply chain.
      </p>
      <button className="mt-8 px-8 py-4 text-lg button text-white rounded-lg">Meet our team</button>
    </div>

    {/* Right - Image Section (Hidden on small screens) */}
    <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 hidden sm:block">
      <img className="w-full max-w-[500px] object-cover" src="/images/customer.png" alt="Second Image" />
    </div>

  </div>
</div>



<div className="button  flex flex-col items-center justify-center text-center px-6 sm:px-12 py-12">

  <p className="text-lg sm:text-xl text-white-700 max-w-2xl leading-relaxed">
  Our White Paper discusses the importance of data collection in supply chains. 
  </p>

  <a
  href="https://res.cloudinary.com/doammcpie/raw/upload/v1740033041/bjgiciegbu1chhm44cw9.odt"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 px-8 py-4 text-lg button-b text-white rounded-lg"
>Download White Paper
</a>

</div>




<section className="justify-center text-center gap-6 lg:gap-10 py-4  sm:px-12">
     <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-snug sm:leading-tight">
        Our Partner
      </h2>
  <div className="w-full text-center p-6 flex flex-col items-center">
  <img className="w-46 h-46 object-cover" src="/images/kabu.png" alt="Second Image" />

  </div>



</section>




 </main>
    </>
  )
}

export default TrackPage
