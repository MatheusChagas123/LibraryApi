import React, { useState, useEffect } from "react";
import "../css/UsersPage.css";

const UsersPage = () => {
  // Estado para armazenar os dados dos usuários
  const [usuarios, setUsuarios] = useState([]);

  // Estado para o cadastro de novo usuário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");

  // Estado para editar um usuário
  const [userId, setUserId] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoLogradouro, setNovoLogradouro] = useState("");
  const [novoCep, setNovoCep] = useState("");
  const [novoBairro, setNovoBairro] = useState("");
  const [novoCidade, setNovoCidade] = useState("");
  const [novoNumero, setNovoNumero] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Função para obter usuários da API
  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/Usuario/todos");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Efeito para carregar usuários na primeira renderização
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Função para cadastrar usuário
  const cadastrarUsuario = async (event) => {
    event.preventDefault();
    const novoUsuario = {
      nome,
      email,
      telefone,
      endereco: {
        logradouro,
        cep,
        bairro,
        cidade,
        numero,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/Usuario/cadastra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        fetchUsuarios(); // Atualizar a lista de usuários após o cadastro
        setNome("");
        setEmail("");
        setTelefone("");
        setLogradouro("");
        setCep("");
        setBairro("");
        setCidade("");
        setNumero("");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  // Função para atualizar o usuário
  const atualizarUsuario = async (event) => {
    event.preventDefault();
    const updatedUsuario = {
      nome: novoNome,
      email: novoEmail,
      telefone: novoTelefone,
      endereco: {
        logradouro: novoLogradouro,
        cep: novoCep,
        bairro: novoBairro,
        cidade: novoCidade,
        numero: novoNumero,
      },
    };

    try {
      const response = await fetch(`http://localhost:8080/Usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUsuario),
      });

      if (response.ok) {
        fetchUsuarios(); // Atualizar a lista de usuários após a atualização
        setShowModal(false);
      } else {
        alert("Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  // Função para deletar o usuário
  const deletarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/Usuario/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsuarios(); // Atualizar a lista de usuários após a exclusão
      } else {
        alert("Erro ao deletar usuário");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  // Abrir o modal de atualização
  const abrirModal = (id) => {
    const usuario = usuarios.find((user) => user.id === id);
    setUserId(usuario.id);
    setNovoNome(usuario.nome);
    setNovoEmail(usuario.email);
    setNovoTelefone(usuario.telefone);
    setNovoLogradouro(usuario.endereco.logradouro);
    setNovoCep(usuario.endereco.cep);
    setNovoBairro(usuario.endereco.bairro);
    setNovoCidade(usuario.endereco.cidade);
    setNovoNumero(usuario.endereco.numero);
    setShowModal(true);
  };

  // Fechar o modal de atualização
  const fecharModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1 class="header__title" style={{ fontFamily: "Times New Roman" }}>
          Gerenciamento de Biblioteca
        </h1>
      </header>
      <div class="container">
        {/* Formulário de Cadastro */}
        <div class="form-container">
          <form onSubmit={cadastrarUsuario}>
            <h3>Cadastro de Usuário</h3>
            <label>Nome: </label>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Telefone: </label>
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />

            {/* Mover o Título Endereço para baixo e ajustar campos */}
            <h4>Endereço</h4>

            <div class="form-row">
              <label>Logradouro: </label>
              <input
                type="text"
                placeholder="Logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                required
              />
              <label style={{ marginLeft: "10px", marginRight: "5px" }}>
                CEP:
              </label>
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />

              <label style={{ marginLeft: "10px" }}>Bairro: </label>
              <input
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>

            <div class="form-row">
              <label style={{ marginRight: "5px" }}>Cidade:</label>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />

              <label style={{ marginLeft: "10px", marginRight: "5px" }}>
                Número:
              </label>
              <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>

        {/* Lista de Usuários */}
        <div class="user-list-container">
          <h3 style={{ padding: "20px" }}>Lista de Usuários</h3>
          <table>
            <thead>
              <tr>
                <th>ID Usuário</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>{`${usuario.endereco.logradouro}, ${usuario.endereco.bairro}, ${usuario.endereco.cidade}`}</td>
                  <td>
                    <button onClick={() => abrirModal(usuario.id)}>
                      Editar
                    </button>
                    <button
                      className="delete"
                      onClick={() => deletarUsuario(usuario.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Edição */}
        {showModal && (
          <div class="form-container">
            <h3
              style={{
                backgroundColor: "#4CAF50",
                padding: "8px",
                color: "WHITE",
                borderRadius: "8px",
                border: "2px solid black",
              }}
            >
              Editar Usuário
            </h3>
            <form onSubmit={atualizarUsuario}>
              <label>Nome: </label>
              <input
                type="text"
                placeholder="Nome"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                required
              />
              <label>E-mail: </label>
              <input
                type="email"
                placeholder="Email"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                required
              />
              <label>Telefone: </label>
              <input
                type="tel"
                placeholder="Telefone"
                value={novoTelefone}
                onChange={(e) => setNovoTelefone(e.target.value)}
                required
              />

              <h4>Endereço</h4>
              <div class="form-row">
                <label>Logradouro: </label>
                <input
                  type="text"
                  placeholder="Logradouro"
                  value={novoLogradouro}
                  onChange={(e) => setNovoLogradouro(e.target.value)}
                  required
                />
                <label style={{ marginLeft: "10px", marginRight: "5px" }}>
                  CEP:
                </label>
                <input
                  type="text"
                  placeholder="CEP"
                  value={novoCep}
                  onChange={(e) => setNovoCep(e.target.value)}
                  required
                />
                <label style={{ marginLeft: "10px" }}>Bairro: </label>
                <input
                  type="text"
                  placeholder="Bairro"
                  value={novoBairro}
                  onChange={(e) => setNovoBairro(e.target.value)}
                  required
                />
              </div>

              <div class="form-row">
                <label style={{ marginRight: "5px" }}>Cidade:</label>
                <input
                  type="text"
                  placeholder="Cidade"
                  value={novoCidade}
                  onChange={(e) => setNovoCidade(e.target.value)}
                  required
                />
                <label style={{ marginLeft: "10px", marginRight: "5px" }}>
                  Número:
                </label>
                <input
                  type="text"
                  placeholder="Número"
                  value={novoNumero}
                  onChange={(e) => setNovoNumero(e.target.value)}
                  required
                />
              </div>
              <div class="button-container">
                <button type="submit">Salvar</button>
                <button class="cancelar" type="button" onClick={fecharModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
