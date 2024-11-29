import React, { useState } from "react";
import "../css/styles.css"; // Importe o arquivo CSS

const BooksPage = () => {
  const baseUrl = "http://localhost:8080/Livro"; // Substitua pela URL do seu backend

  // Estados para gerenciar a lista de livros
  const [livros, setLivros] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Função para registrar livro
  const registrarLivro = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const livro = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${baseUrl}/registra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livro),
      });
      if (response.ok) {
        form.reset(); // Limpar formulário
        listarLivros(); // Atualizar lista
      } else {
        const error = await response.json();
        console.error(error.message || "Erro ao registrar livro");
      }
    } catch (error) {
      console.error("Erro ao conectar à API");
    }
  };

  // Função para listar livros
  const listarLivros = async () => {
    try {
      const response = await fetch(`${baseUrl}/todos`);
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
        setShowTable(true); // Exibir tabela
      } else {
        console.error("Erro ao buscar livros");
      }
    } catch (error) {
      console.error("Erro ao conectar à API");
    }
  };

  // Função para atualizar livro
  const atualizarLivro = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const livro = Object.fromEntries(formData.entries());
    const { id, ...dadosAtualizados } = livro;

    // Filtrar campos vazios para não sobrescrever com valores em branco
    const dadosFiltrados = Object.fromEntries(
      Object.entries(dadosAtualizados).filter(
        ([_, value]) => value.trim() !== ""
      )
    );

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFiltrados),
      });

      if (response.ok) {
        // Atualizar o estado dos livros para refletir a alteração
        const livroAtualizado = await response.json();
        setLivros((livrosAnteriores) =>
          livrosAnteriores.map((livro) =>
            livro.id === parseInt(id, 10)
              ? { ...livro, ...livroAtualizado }
              : livro
          )
        );
      } else {
        const error = await response.json();
        console.error(error.message || "Erro ao atualizar livro");
      }
    } catch (error) {
      console.error("Erro ao conectar à API");
    }
  };

  // Função para deletar livro
  const deletarLivro = async (e) => {
    e.preventDefault();
    const id = e.target.livroId.value;

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        listarLivros(); // Atualizar lista
      } else {
        console.error("Erro ao deletar livro");
      }
    } catch (error) {
      console.error("Erro ao conectar à API");
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1 class="header__title" style={{ fontFamily: "Times New Roman" }}>
          Gerenciamento de Biblioteca
        </h1>
      </header>
      <div class="container">
        {/* Formulário para registrar livro */}
        <div class="form-container" style={{ marginBottom: "40px" }}>
          <h3>Registrar Livro</h3>
          <form onSubmit={registrarLivro}>
            <label>Título: </label>
            <input type="text" name="titulo" placeholder="Título" required />

            <label>Autor:</label>
            <input type="text" name="autor" placeholder="Autor" required />

            <div class="form-row">
              <label>Gênero:</label>
              <select
                name="genero"
                required
                style={{
                  width: "15%",
                  padding: "10px 0px 10px 5px",
                  marginLeft: "5px",
                }}
              >
                <option value="ACAO">Ação</option>
                <option value="ROMANCE">Romance</option>
                <option value="AUTO_AJUDA">Auto Ajuda</option>
                <option value="TERROR">Terror</option>
                <option value="FANTASIA">Fantasia</option>
                <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
              </select>

              <label style={{ marginLeft: "10px" }}>Data de Publicação:</label>
              <input
                type="date"
                name="dataDePublicacao"
                required
                style={{
                  width: "13%",
                  marginTop: "10px",
                  padding: "5px",
                  marginLeft: "5px",
                }}
              />

              <label style={{ marginLeft: "10px" }}>Estado do Livro:</label>
              <select
                name="estadoDoLivro"
                required
                style={{
                  width: "12%",
                  padding: "10px 0px 10px 5px",
                  marginLeft: "5px",
                }}
              >
                <option value="CONSERVADO">Conservado</option>
                <option value="BOM">Bom</option>
                <option value="REGULAR">Regular</option>
                <option value="RUIM">Ruim</option>
                <option value="PESSIMO">Péssimo</option>
              </select>
            </div>

            <label style={{ marginTop: "20px" }}>Descrição:</label>
            <textarea
              name="descricao"
              placeholder="Descrição"
              required
              style={{
                height: "100px",
                width: "70%",
                fontSize: "1rem",
                padding: "10px",
                border: "1px solid #616161",
                resize: "none",
                overflowY: "scroll",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            ></textarea>
            <button type="submit">Registrar</button>
          </form>
        </div>

        {/* Botão para listar livros */}
        <div class="form-container" style={{ marginBottom: "40px" }}>
          <h3>Lista de Livros</h3>
          <button onClick={listarLivros}>Listar Livros</button>
          {showTable && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Gênero</th>
                  <th>Data de Publicação</th>
                  <th>Descrição</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro.id} id={`livro-${livro.id}`}>
                    <td>{livro.id}</td>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.genero}</td>
                    <td>{livro.dataDePublicacao}</td>
                    <td>{livro.descricao}</td>
                    <td>{livro.estadoDoLivro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Formulário para atualizar livro */}
        <div class="form-container" style={{ marginBottom: "40px" }}>
          <h3>Atualizar Livro</h3>
          <form onSubmit={atualizarLivro}>
            <label>Título: </label>
            <input type="text" name="titulo" placeholder="Título" required />

            <label>Autor:</label>
            <input type="text" name="autor" placeholder="Autor" required />

            <div class="form-row">
              <label>Gênero:</label>
              <select
                name="genero"
                required
                style={{
                  width: "15%",
                  padding: "10px 0px 10px 0px",
                  marginLeft: "5px",
                }}
              >
                <option value="ACAO">Ação</option>
                <option value="ROMANCE">Romance</option>
                <option value="AUTO_AJUDA">Auto Ajuda</option>
                <option value="TERROR">Terror</option>
                <option value="FANTASIA">Fantasia</option>
                <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
              </select>

              <label style={{ marginLeft: "10px" }}>Data de Publicação:</label>
              <input
                type="date"
                name="dataDePublicacao"
                required
                style={{
                  width: "13%",
                  marginTop: "10px",
                  padding: "5px",
                  marginLeft: "5px",
                }}
              />

              <label style={{ marginLeft: "10px" }}>Estado do Livro:</label>
              <select
                name="estadoDoLivro"
                required
                style={{
                  width: "12%",
                  padding: "10px 0px 10px 5px",
                  marginLeft: "5px",
                }}
              >
                <option value="CONSERVADO">Conservado</option>
                <option value="BOM">Bom</option>
                <option value="REGULAR">Regular</option>
                <option value="RUIM">Ruim</option>
                <option value="PESSIMO">Péssimo</option>
              </select>
            </div>

            <label style={{ marginTop: "20px" }}>Descrição:</label>
            <textarea
              name="descricao"
              placeholder="Descrição"
              required
              style={{
                height: "100px",
                width: "70%",
                fontSize: "1rem",
                padding: "10px",
                border: "1px solid #616161",
                resize: "none",
                overflowY: "scroll",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            ></textarea>

            <label style={{ marginTop: "12px" }}>ID do Livro:</label>
            <input
              type="number"
              name="id"
              placeholder="ID do livro"
              required
              style={{ width: "10%" }}
            />

            <button type="submit">Atualizar</button>
          </form>
        </div>

        {/* Formulário para deletar livro */}
        <div class="form-container" style={{ marginBottom: "40px" }}>
          <h3>Deletar Livro</h3>
          <form onSubmit={deletarLivro}>
            <label>ID do Livro:</label>
            <input
              type="number"
              name="livroId"
              placeholder="ID do livro"
              required
              style={{ width: "10%" }}
            />
            <button type="submit">Deletar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
