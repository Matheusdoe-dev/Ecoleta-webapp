import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

// apis
import apiEcoleta from "../../services/ecoleta-api";
import apiIBGE from "../../services/ibge-api";

// styles
import { FormWrapper, Field, FieldGroup, ItemsGrid, Leaflet } from "./styles";

// component
import Dropzone from "./../Dropzone/index";

// interfaces
interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface UF {
  name: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Form = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, [initialPosition]);

  useEffect(() => {
    apiEcoleta.get("items").then((response) => {
      setItems(response.data);
    });
  }, [setItems]);

  useEffect(() => {
    apiIBGE.get<IBGEUFResponse[]>("/").then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    apiIBGE
      .get<IBGECityResponse[]>(`/${selectedUf}/municipios`)
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSelectedUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;

    setSelectedUf(uf);
  };

  const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;

    setSelectedCity(city);
  };

  const handleLocation = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));
    
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    await apiEcoleta.post("points", data);

    alert("Ponto de coleta criado com sucesso!");

    history.push("/");
  };

  const handleSelectedItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1>
        Cadastro do
        <br /> ponto de coleta
      </h1>

      <Dropzone onFileUploaded={setSelectedFile} />

      <fieldset>
        <legend>
          <h2>Dados</h2>
        </legend>

        <Field>
          <label htmlFor="name">Nome da entidade</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />
        </Field>

        <FieldGroup>
          <Field>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange}
            />
          </Field>
        </FieldGroup>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Endereço</h2>
          <span>Selecione o endereço no mapa</span>
        </legend>

        <Leaflet
          center={[-12.8283735, -38.4731045]}
          zoom={14}
          onclick={handleLocation}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={selectedPosition} />
        </Leaflet>

        <FieldGroup>
          <Field>
            <label htmlFor="uf">Estado (UF)</label>
            <select
              name="uf"
              id="uf"
              onChange={handleSelectedUf}
              value={selectedUf}
            >
              <option value="0">Selecione uma uf</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <label htmlFor="city">Cidade</label>
            <select
              name="city"
              id="city"
              onChange={handleSelectedCity}
              value={selectedCity}
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
        </FieldGroup>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Items de coleta</h2>
          <span>Selecione um ou mais ítens abaixo</span>
        </legend>

        <ItemsGrid>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectedItem(item.id)}
              className={selectedItems.includes(item.id) ? "selected" : ""}
            >
              <img src={item.image_url} alt={item.title} />
              <span>{item.title}</span>
            </li>
          ))}
        </ItemsGrid>
      </fieldset>

      <button type="submit">Cadastrar ponto de coleta</button>
    </FormWrapper>
  );
};

export default Form;
