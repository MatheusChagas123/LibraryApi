import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    logradouro: "",
    cep: "",
    bairro: "",
    cidade: "",
    numero: "",
  });

  const baseUrl = "http://localhost:8080"; // URL da API

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${baseUrl}/Usuario/todos`);
      if (!response.ok) throw new Error("Erro ao buscar usuários.");
      const data = await response.json();
      console.log("Dados recebidos:", data); // Inspecione os dados aqui
      setUsuarios(data || []); // Garante que sempre será um array
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };
  

  // Função para cadastrar um novo usuário
  const cadastrarUsuario = async (userPayload) => {
    try {
      const response = await fetch(`${baseUrl}/Usuario/cadastra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar usuário.");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  };

  // Chamada inicial para buscar usuários
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Manipula as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userPayload = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      endereco: {
        logradouro: formData.logradouro,
        cep: formData.cep,
        bairro: formData.bairro,
        cidade: formData.cidade,
        numero: formData.numero,
      },
    };
  
    try {
      await cadastrarUsuario(userPayload);
      alert("Usuário cadastrado com sucesso!");
      await fetchUsuarios(); // Recarrega a lista de usuários
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        logradouro: "",
        cep: "",
        bairro: "",
        cidade: "",
        numero: "",
      });
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
    }
  };
  
  return (
    <div className="container">
      <header>
        <h1>Gerenciar Usuários</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar Usuário</h2>

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
          </div>

          <h3>Endereço</h3>

          <div className="form-group">
            <label htmlFor="logradouro">Logradouro:</label>
            <input
              type="text"
              id="logradouro"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>

        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>
                    {`${usuario.endereco.logradouro}, ${usuario.endereco.numero} - ${usuario.endereco.bairro}, ${usuario.endereco.cidade}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UsersPage;
