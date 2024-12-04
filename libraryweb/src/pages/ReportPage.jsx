import React, { useEffect, useState } from "react";

const ReportPage = () => {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [usersWithLateLoans, setUsersWithLateLoans] = useState([]);
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
          throw new Error(
            "Erro ao buscar os usuários com empréstimos pendentes"
          );
        }

        const usersData = await usersResponse.json();

        // Filtra os usuários para exibir apenas os com status "EM_ATRASO"
        const filteredUsers = usersData.filter(
          (user) => user.usuario && user.usuario.status === "EM_ATRASO"
        );

        setUsersWithLateLoans(filteredUsers);

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
    <div className="dashboard">
      <header className="header">
        <h1 className="header__title" style={{ fontFamily: "Times New Roman" }}>
          Gerenciamento de Biblioteca
        </h1>
      </header>
      <div className="container">
        <div className="user-list-container">
          <h2 style={{ marginBottom: "40px", padding: "10px" }}>Relatórios</h2>

          {/* Relatório de Livros Mais Emprestados */}
          <section>
            <h3 style={{ padding: "20px" }}>Livros Mais Emprestados</h3>
            <table>
              <thead>
                <tr>
                  <th>ID Livro</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Quantidade de Empréstimos</th>
                </tr>
              </thead>
              <tbody>
                {mostBorrowedBooks.length > 0 ? (
                  mostBorrowedBooks.map((book) => (
                    <tr key={book.id}>
                      <td style={{ alignItems: "center" }}>{book.id}</td>
                      <td>{book.titulo}</td>
                      <td>{book.autor}</td>
                      <td style={{ padding: "0px 0px 0px 100px" }}>
                        {book.qtdEmprestado}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Nenhum dado disponível.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Relatório de Usuários com Empréstimos Pendentes */}
          <section>
            <h3 style={{ padding: "20px" }}>Usuários com Empréstimos Pendentes</h3>
            <table>
              <thead>
                <tr>
                  <th>ID Usuário</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usersWithLateLoans.length > 0 ? (
                  usersWithLateLoans.map((user) => (
                    <tr key={user.usuario.id}>
                      <td>{user.usuario.id}</td> {/* ID do usuário */}
                      <td>{user.usuario.nome}</td> {/* Nome do usuário */}
                      <td>{user.usuario.email}</td> {/* Email do usuário */}
                      <td>{user.usuario.status}</td> {/* Status do usuário */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Nenhum dado disponível.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;