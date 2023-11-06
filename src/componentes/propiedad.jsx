function Propiedad({ propiedades, handlePropChange }) {
    return (
      <div>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select defaultValue="" id="propiedad" onChange={handlePropChange}>
          <option value="">...</option>
          {propiedades.map((itemCat) => (
            <option key={itemCat.tipo} value={itemCat.factor}>
              {itemCat.tipo}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Propiedad;