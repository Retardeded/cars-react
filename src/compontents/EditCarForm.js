import React from 'react';

const EditCarForm = ({ car, handleEditCar, setSelectedCar }) => {
  const handleCancel = () => {
    setSelectedCar(null);
  };

  return (
    <form className="edit-car-form" onSubmit={event => handleEditCar(event, car.id)}>
      <label>
        Brand:
        <input type="text" name="brand" defaultValue={car.brand.name} />
      </label>
      <label>
        Model:
        <input type="text" name="model" defaultValue={car.model} />
      </label>
      <label>
        VIN:
        <input type="text" name="vin" defaultValue={car.vin} />
      </label>
      <label>
        Registration Number:
        <input type="text" name="registrationNumber" defaultValue={car.registrationNumber} />
      </label>
      <div className="buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditCarForm;