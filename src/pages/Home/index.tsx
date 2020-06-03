import React from "react";
import { HomeWrapper, Content } from "./styles";
import { Link } from "react-router-dom";
import { FiSearch, FiLogIn } from "react-icons/fi";

// components
import Header from "./../../components/Header/index";

const Home = () => {
  return (
    <HomeWrapper>
      <Content>
        <Header>
          <Link to="/cadastro">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastrar um ponto de coleta</strong>
          </Link>
        </Header>

        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </p>
          <Link to="/cadastro">
            <span>
              <FiSearch />
            </span>
            <strong>Pesquisar um ponto de coleta</strong>
          </Link>
        </main>
      </Content>
    </HomeWrapper>
  );
};

export default Home;
