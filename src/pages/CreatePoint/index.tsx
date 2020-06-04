import React from "react";
import { CreatePointWrapper } from "./styles";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

// components
import Header from "../../components/Header/index";
import Form from "../../components/Form/index";

const CreatePoint = () => {
  return (
    <CreatePointWrapper>
      <Header>
        <Link to="/">
          <span>
            <FiLogIn />
          </span>
          <strong>Voltar para home</strong>
        </Link>
      </Header>

      <Form />
    </CreatePointWrapper>
  );
};

export default CreatePoint;
