import React from 'react';

const CarTable = ({cars, selectedBrand, handleDeleteCar, setSelectedCar}) => {
  return (
    <>
      <h1 className= "header" >Cars</h1>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Registration Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars
            .filter(car => !selectedBrand || car.brand.name === selectedBrand)
            .map(car => (
              <tr key={car.id}>
                <td>{car.brand.name}</td>
                <td>{car.model}</td>
                <td>{car.vin}</td>
                <td>{car.registrationNumber}</td>
                <td>
                <button onClick={(event) => handleDeleteCar(event, car.id)}>Delete</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedCar(car);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>

            )
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default CarTable;