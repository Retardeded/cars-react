import React from 'react';

const AddCarForm = ({ onAddCar }) => {
  const handleCreateCar = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const car = {
      brand: {
        name: formData.get('brand')
      },
      model: formData.get('model'),
      vin: formData.get('vin'),
      registrationNumber: formData.get('registrationNumber')
    };

    fetch('http://localhost:8080/cars/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then(res => res.json())
      .then(newCar => onAddCar(newCar))
      .catch(error => console.error(error));
  };

  return (
    <>
      <h2 className= "header" >Add a Car</h2>
      <form className = "add-car-form" onSubmit={handleCreateCar}>
        <label>
          Brand:
          <input type="text" name="brand" />
        </label>
        <label>
          Model:
          <input type="text" name="model" />
        </label>
        <label>
          VIN:
          <input type="text" name="vin" />
        </label>
        <label>
          Registration Number:
          <input type="text" name="registrationNumber" />
        </label>
        <button type="submit">Add Car</button>
      </form>
    </>
  );
};

export default AddCarForm;