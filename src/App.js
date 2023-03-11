import { useState, useEffect } from 'react';
import BrandFilter from './compontents/BrandFilter';
import AddCarForm from './compontents/AddCarForm';
import EditCarForm from './compontents/EditCarForm';
import CarTable from './compontents/CarTable';
import "./compontents/AddCarForm.css"
import "./compontents/BrandFilter.css"
import "./compontents/CarTable.css";
import "./compontents/EditCarForm.css";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Fetch all cars when the component mounts
    fetch('http://localhost:8080/cars')
      .then(res => res.json())
      .then(data => setCars(data));

    // Fetch all brands when the component mounts
    fetch('http://localhost:8080/cars/brands')
      .then(res => res.json())
      .then(data => setBrands(data));
  }, []);

  // Function to handle form submission for creating a new car
  const handleCreateCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  const handleDeleteCar = (event, carId) => {
    event.preventDefault();
      fetch(`http://localhost:8080/cars/delete/${carId}`, {
        method: 'DELETE'
      })
        .then(() => {
          const updatedCars = cars.filter(c => c.id !== carId);
          setCars(updatedCars);
        })
        .catch(error => console.error(error));
  };

  // Function to handle form submission for filtering cars by brand
  const handleFilterCars = event => {
    event.preventDefault();
    setSelectedBrand(event.target.brand.value);
  };

  const handleEditCar = (event, carId) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedCar = {
      brand: {
        name: formData.get('brand')
      },
      model: formData.get('model'),
      vin: formData.get('vin'),
      registrationNumber: formData.get('registrationNumber')
    };

    fetch(`http://localhost:8080/cars/update/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCar)
    })
      .then(res => res.json())
      .then(updatedCar => {
        const updatedCars = cars.map(c => (c.id === updatedCar.id ? updatedCar : c));
        setCars(updatedCars);
        setSelectedCar(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <BrandFilter brands={brands} handleFilterCars={handleFilterCars} />
      <CarTable
        cars={cars}
        selectedBrand={selectedBrand}
        handleDeleteCar={handleDeleteCar}
        setSelectedCar={setSelectedCar}
      />

      {selectedCar && <EditCarForm car={selectedCar} handleEditCar={handleEditCar} setSelectedCar={setSelectedCar} />}

      <AddCarForm onAddCar={handleCreateCar} />


    </div>
  );
}

export default App;
