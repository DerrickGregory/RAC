import {  useCallback, useState,useEffect } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader"
import ListingCard from "../components/ListingCard";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";
import Map from "../components/Map";

import { BiSolidCar } from "react-icons/bi";
import { FiMapPin, FiFileText, FiDatabase, FiSend } from "react-icons/fi";
import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { FaUserFriends, FaBuilding, FaExchangeAlt } from "react-icons/fa";


import { FaTruckMoving } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";
import { IoFlower } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { RiEBike2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { getDriversAsync } from "../features/driver/driverActions";

function HomePage({ listings, isLoading }) {
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();

 const { drivers } = useSelector((state) => state.drivers)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  useEffect(() => {


      dispatch(getDriversAsync())
  
  }, [dispatch]);



  const sections = [
    { title: "Real-Time Reporting", content: "Users (drivers, police, NTSA) can report accidents on-site with immediate data capture." },
    { title: "Geolocation Accuracy", content: "Reports are automatically tagged with GPS coordinates to improve response time and tracking." },
    { title: "Tamper-Proof Evidence", content: "Uploaded images and data are stored securely to support investigations and insurance claims." }
  ];

  return (
    <>
 <div className="w-full h-[550px] sm:h-[300px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] relative">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.google.com/maps/d/embed?mid=1_Cp21MB7Zkf-jo6E9rvuvX5fP6E&ehbc=2E312F"
    frameBorder="0"
    allowFullScreen=""
    aria-hidden="false"
    tabIndex="0"
  ></iframe>
</div>


      <main>
        <div className="bg">
          <h2 className="text-center text-4xl font-semibold pb-5 text-gray-900">
            ROAD ACCIDENT COMBAT
          </h2>
          <p className="text-center text-lg text-gray-700 leading-relaxed">
            Empowering citizens and authorities with tools to improve road safety and incident management.
          </p>

        <section className="max-w-7xl mx-auto sm:px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ListingCard
              icon={BiSolidCar}
              image="/images/crash.jpg"
              label="Crash Reporting"
              description="Quickly log accident details, witness info, and photos directly from the scene."
            />
            <ListingCard
              icon={FiSend}
              image="/images/police.webp"
              label="Police Integration"
              description="Enables traffic officers to record cases digitally for better coordination."
            />
            <ListingCard
              icon={BiSolidMap}
              image="/images/map.png"
              label="Incident Mapping"
              description="Visualize accident hotspots to help authorities with urban planning."
            />
          </div>
        </section>

        </div>



        <div className="relative bg-white py-16 px-6 md:px-12 lg:px-20">
          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center">

               <div className="md:w-1/2 bg-white p-6  relative md:ml-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 leading-snug mb-4">
        Road Accident Combat System (RAC)
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        The RAC is a smart vehicle-integrated safety system designed to detect, prevent, and respond to road accident risks in real time.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
        <li>Obstacle detection using infrared sensors</li>
        <li>Real-time driver behavior analysis</li>
        <li>Vehicle-to-vehicle communication</li>
      </ul>
      <p className="text-gray-700 leading-relaxed">
        Inspired by global innovations, RAC seeks to minimize human error and revolutionize road safety through intelligent automation.
      </p>
    </div>

            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg relative md:ml-auto">
              <h3 className="text-red-500 font-bold text-lg">CASE STUDY</h3>
              <h2 className="text-2xl font-bold mt-2">
                How Real-Time Reporting Improved Emergency Response
              </h2>
              <p className="text-gray-600 mt-3">
                In pilot programs, NTSA officers using the app reduced response time by 42% in accident-prone zones.
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-3">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full bg-red-500 text-white font-semibold py-3 px-5 rounded-md"
                  >
                    {section.title}
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </button>
                  {openIndex === index && (
                    <div className="p-4 bg-gray-100 text-gray-700 rounded-md mt-2">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div> 

          </div>
        </div>


















         


      </main>
    </>
  );
}

export default HomePage;
