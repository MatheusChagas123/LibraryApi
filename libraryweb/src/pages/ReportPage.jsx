import React, { useEffect, useState } from "react";

const ReportPage = () => {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do relatório
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Endpoint para livros mais emprestados
        const booksResponse = await fetch(
          "http://localhost:8080/Livro/maisEmprestado"
        );

        if (!booksResponse.ok) {
          throw new Error("Erro ao buscar os livros mais emprestados");
        }

        const booksData = await booksResponse.json();
        setMostBorrowedBooks(booksData);

        // Endpoint para usuários com empréstimos pendentes
        const usersResponse = await fetch(
          "http://localhost:8080/Emprestimo/todos"
        );

        if (!usersResponse.ok) {
          throw new Error("Erro ao buscar os usuários com empréstimos pendentes");
        }

        const usersData = await usersResponse.json();

        // Filtra os usuários para exibir apenas os com status EM_ATRASO
        const filteredUsers = usersData.filter(
          (user) => user.usuario.status === "EM_ATRASO"
        );
        setUserId(filteredUsers);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados do relatório:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []); // Dependência vazia significa que isso será executado apenas uma vez

  // Exibir mensagem de carregamento enquanto os dados são buscados
  if (loading) {
    return <p>Carregando relatórios...</p>;
  }

  return (
    <div className="report-page">
      <h1>Relatórios</h1>

      {/* Relatório de Livros Mais Emprestados */}
      <section>
        <h2>Livros Mais Emprestados</h2>
        <table>
          <thead>
            <tr>
              <th>ID do Livro</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Quantidade de Empréstimos</th>
            </tr>
          </thead>
          <tbody>
            {mostBorrowedBooks.length > 0 ? (
              mostBorrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.titulo}</td>
                  <td>{book.autor}</td>
                  <td>{book.qtdEmprestado}</td> {/* Ajustado para qtdEmprestado */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum dado disponível.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Relatório de Usuários com Empréstimos Pendentes */}
      <section>
        <h2>Usuários com Empréstimos Pendentes</h2>
        <table>
          <thead>
            <tr>
              <th>ID do Usuário</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userId.length > 0 ? (
              userId.map((user) => (
                <tr key={user.id}>
                  <td>{user.usuario.id}</td> {/* ID do usuário */}
                  <td>{user.usuario.nome}</td> {/* Nome do usuário */}
                  <td>{user.usuario.email}</td> {/* Email do usuário */}
                  <td>{user.usuario.status}</td> {/* Status do usuário */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum dado disponível.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ReportPage;
