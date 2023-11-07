import { useEffect } from "react";
import { useState } from "react";
import '/css/style.css'

export default function Historial() {
  //Importo los datos
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savingData")) || [];
    setData(data);
  }, []);

  return (
    <div>
      <h1 className="center separador">Ver Historial 📋</h1>
      <div className="center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => (
              <tr key={id}>
                <td>{item.fecha}</td>
                <td>{item.tipoPropiedad}</td>
                <td>{item.tipoUbicacion}</td>
                <td>{item.metros2}</td>
                <td>{item.poliza.toFixed(2)}</td>
                <td>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <a href="/">
            <button className="button button-outline">VOLVER</button>
          </a>
        </div>
      </div>
    </div>
  );
  
}