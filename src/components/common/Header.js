import React from "react";
import styled from "styled-components";

const Unordered = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  height: 350px;
  a {
    text-decoration: none;
    border: 1px solid black;
    padding: 20px 60px;
    font-weight: 700;
    color: black;
    &:hover {
      background: #00000059;
      color: white;
    }
  }
`;

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <Unordered className="something">
          <li>
            <a href="/admin">Admin</a>
          </li>
          <li>
            <a href="/employee">Employee</a>
          </li>
        </Unordered>
      </nav>
    </header>
  );
};

export default Header;
