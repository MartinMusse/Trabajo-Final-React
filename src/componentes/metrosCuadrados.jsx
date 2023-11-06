
function MetrosCuadrados({ data, handleM2Change }) {
    return (
      <div>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          min="20"
          max="500"
          required
          value={data.metros2}
          onChange={handleM2Change}
        />
      </div>
    );
  }
  
  export default MetrosCuadrados;
