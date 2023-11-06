import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import Propiedad from "/src/componentes/propiedad";
import Ubicacion from "/src/componentes/ubicacion";
import MetrosCuadrados from "/src/componentes/metrosCuadrados";

export default function Index() {
  const [data, setData] = useState({
    tipoPropiedad: "",
    factorPropiedad: 0,
    tipoUbicacion: "",
    factorUbicacion: 0,
    metros2: 0,
    costoM2: 35.86,
    poliza: 0,
  });

  const [categorias, setCategorias] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const datos = await fetch("datos.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const cat = await datos.json();
      setCategorias(cat);
    };
    fetchData();
  }, [data]);

  const propiedades = useMemo(() => {
    return (categorias || []).filter(
      (itemCat) => itemCat.categoria === "propiedad"
    );
  }, [categorias]);

  const ubicaciones = useMemo(() => {
    return (categorias || []).filter(
      (itemCat) => itemCat.categoria === "ubicacion"
    );
  }, [categorias]);

  const handlePropChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setData((oldData) => ({
      ...oldData,
      factorPropiedad: e.target.value,
      tipoPropiedad: selectedOption.textContent,
    }));
  };

  const handleUbiChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setData((oldData) => ({
      ...oldData,
      factorUbicacion: e.target.value,
      tipoUbicacion: selectedOption.textContent,
    }));
  };

  const handleM2Change = (e) => {
    setData((oldData) => ({ ...oldData, metros2: e.target.value }));
  };

  const cotizarPoliza = () => {
    const poliza =
      data.costoM2 * data.factorPropiedad * data.factorUbicacion * data.metros2;
    setData((oldData) => ({ ...oldData, poliza }));
    return poliza; // valor de poliza
  };

  const guardarEnHistorial = () => {
    const poliza = cotizarPoliza();
    // se guarda el historial en el LocalStorage
    const savingData = localStorage.getItem("savingData");
    const parsedSavingData = JSON.parse(savingData || "[]");
    parsedSavingData.push({ ...data, poliza, fecha: new Date() });
    localStorage.setItem("savingData", JSON.stringify(parsedSavingData));

    // Mostrar SweetAlert
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Guardado en historial",
      showConfirmButton: true,
      timer: 2000,
    });
  };

  const validarCampos = () => {
    if (
      data.tipoPropiedad === "" ||
      data.tipoUbicacion === "" ||
      data.metros2 === 0
    ) {
      //error
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe completar todos los campos",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      cotizarPoliza()
    }
  };

  return (
    <div>
      <div className="historial">
        <a href="/historial">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className="center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>

        <Propiedad propiedades={propiedades} handlePropChange={handlePropChange} />
        <Ubicacion ubicaciones={ubicaciones} handleUbiChange={handleUbiChange} />
        <MetrosCuadrados data={data} handleM2Change={handleM2Change} />

        <div className="center separador">
          <button onClick={validarCampos} className="button button-outline">
            Cotizar
          </button>
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $
            <span id="valorPoliza">{data.poliza.toFixed(2)}</span>
          </p>
          <h3 style={{cursor: "pointer"}} className="" title="Guardar en historial" onClick={guardarEnHistorial}>
            💾
          </h3>
          </div>
      </div>
    </div>
  );
}
