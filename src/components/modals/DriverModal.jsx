import axios from 'axios'
import useDriverModal from "../../hooks/useDriverModal";
import { url } from "../../utils/url"

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useDispatch, useSelector } from 'react-redux'
import { getDriversAsync } from "../../features/driver/driverActions";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form'
import Select from 'react-select';
import subCountiesData from '../../utils/counties.json';

function DriverModal() {
  const driverModal = useDriverModal();
  const { drivers } = useSelector((state) => state.drivers);
  const dispatch = useDispatch();

  const nakuruCounty = subCountiesData.find((c) => c.name === 'Nakuru');
  const allWards = nakuruCounty.constituencies.flatMap((constituency) =>
    constituency.wards.map((ward) => ({
      value: ward,
      label: ward,
      constituency: constituency.name,
    }))
  );

  const [selectedWard, setSelectedWard] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      latitude: '',
      longitude: '',
      sender_location: '',
    },
  });

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleWardChange = async (wardOption) => {
    setSelectedWard(wardOption);

    const locationStr = `Kenya,Nakuru,${wardOption.constituency},${wardOption.value}`;
    setCustomValue('sender_location', locationStr);

    try {
      const res = await axios.post(`${url}/geocode`, {
        senderLocation: locationStr,
        receiverLocation: null,
      });

      const coordinates = res.data.senderCoordinates;
      if (coordinates && coordinates.length === 2) {
        setCustomValue('latitude', coordinates[0]);
        setCustomValue('longitude', coordinates[1]);
        toast.success('Coordinates set!');
      } else {
        toast.error('Invalid coordinates returned.');
      }
    } catch (error) {
      toast.error('Failed to fetch coordinates.');
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
  

    axios.post(`${url}/register`, data)
      .then(() => {
        toast.success('Driver Registered!');
        driverModal.onClose();
      })
      .catch(() => {
        toast.error('Registration error!');
      })
      .finally(() => {
        dispatch(getDriversAsync());
    
      });
  };

  const onToggle = useCallback(() => {
    driverModal.onClose();
  
  }, [driverModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
   

      <Select
        placeholder="Select Ward"
        options={allWards}
        value={selectedWard}
        onChange={handleWardChange}
        isClearable
      />

      <Input
        id="date_time"
        label="Date & Time"
        type="date"
      
        register={register}
        errors={errors}
        required
      />

      {/* Hidden fields for coordinates */}
      <input type="hidden" {...register("latitude", { required: true })} />
      <input type="hidden" {...register("longitude", { required: true })} />
      <input type="hidden" {...register("sender_location", { required: true })} />

      <select
        id="accident_type"
        {...register("accident_type", { required: true })}
        className="p-2 border rounded"
      
      >
        <option value="">-- Select Accident Type --</option>
        <option value="Rear-end Collision">Rear-end Collision</option>
        <option value="Head-on Collision">Head-on Collision</option>
        <option value="Side-impact">Side-impact (T-bone)</option>
        <option value="Sideswipe">Sideswipe</option>
        <option value="Single Vehicle">Single Vehicle</option>
        <option value="Pedestrian Involved">Pedestrian Involved</option>
        <option value="Motorcycle Accident">Motorcycle Accident</option>
        <option value="Hit and Run">Hit and Run</option>
        <option value="Rollover">Rollover</option>
        <option value="Animal Collision">Animal Collision</option>
        <option value="Multiple Vehicle">Multiple Vehicle</option>
        <option value="Stationary Object">Stationary Object</option>
      </select>

      <select
        id="severity"
        {...register("severity", { required: true })}
        className="p-2 border rounded"
        
      >
        <option value="">-- Select Severity --</option>
        <option value="minor">Minor</option>
        <option value="serious">Serious</option>
        <option value="fatal">Fatal</option>
      </select>

      <select
        id="road_condition"
        {...register("road_condition", { required: true })}
        className="p-2 border rounded"
  
      >
        <option value="">-- Select Road Condition --</option>
        <option value="Dry">Dry</option>
        <option value="Wet">Wet</option>
        <option value="Icy">Icy</option>
        <option value="Muddy">Muddy</option>
        <option value="Under Construction">Under Construction</option>
      </select>

      <textarea
        id="description"
        placeholder="Describe the incident..."
        {...register("description", { required: true })}
        className="p-2 border rounded"
        rows={4}
        
      />
    </div>
  );

  return (
    <Modal
      
      isOpen={driverModal.isOpen}
      title="Report Accident"
      actionLabel="Continue"
      onClose={driverModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default DriverModal;
