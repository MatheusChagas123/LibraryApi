import React from "react";
import { Link } from "react-router-dom";
import livrologo from "../assets/livrologo.png"; // Importando a imagem

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="header__title">Gerenciamento de Biblioteca</h1>
      </header>

      <main className="main">
        {/* Imagem centralizada */}
        <div className="image-container">
          <img 
            src={livrologo} 
            alt="Gerenciamento de Biblioteca" 
            className="dashboard__image" 
          />
        </div>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/users" className="nav__link">
                Gerenciar Usuários
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/books" className="nav__link">
                Gerenciar Livros
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/loans" className="nav__link">
                Gerenciar Empréstimos
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default Dashboard;
