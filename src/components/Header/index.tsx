import React from "react";
import { Link } from "react-router-dom";
import { HeaderWrapper } from "./styles";

// imgs
import logoImg from "../../assets/logo.svg";

// interface HeaderProps {
// //   linkTo: string;
// //   span: Element;
// //   strong: string;
//

const Header: React.FC = ({ children }) => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <img src={logoImg} alt="Ecoleta" />
      </Link>

      {children}
    </HeaderWrapper>
  );
};

export default Header;
