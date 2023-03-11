import React from "react";

function BrandFilter({ brands, handleFilterCars }) {
  return (
    <>
    <div className = "brand-filter">
      <h2>Filter by Brand</h2>
      <form onSubmit={handleFilterCars}>
        <select name="brand">
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>
    </div>
    </>
  );
}

export default BrandFilter;