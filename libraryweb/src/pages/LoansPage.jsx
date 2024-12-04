import React, { useState, useEffect } from "react";
import "../css/LoansPage.css";

const LoansPage = () => {
  const baseUrl = "http://localhost:8080/Emprestimo"; // URL do backend

  const [loans, setLoans] = useState([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loanId, setLoanId] = useState(""); // Para a devolução
  const [returnDate, setReturnDate] = useState(""); // Data de devolução
  const [message, setMessage] = useState(""); // Mensagens de feedback

  // Função para buscar empréstimos
  const fetchLoans = async () => {
    try {
      const response = await fetch(`${baseUrl}/todos`);
      const data = await response.json();
      if (response.ok) {
        setLoans(data);
      } else {
        setLoans([]);
      }
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
      setLoans([]);
    }
  };

  // Função para registrar o empréstimo
  const handleLoan = async (e) => {
    e.preventDefault();
    try {
      // Verifica se a data limite é válida
      const currentDate = new Date().toISOString().split("T")[0];
      if (dueDate < currentDate) {
        setMessage("A data limite não pode ser no passado.");
        return;
      }

      const response = await fetch(`${baseUrl}/aluga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId: userId,
          livroId: bookId,
          dataLimite: dueDate,
          status: "PENDENTE", // Status inicialmente "PENDENTE"
        }),
      });

      if (response.ok) {
        setMessage("Empréstimo registrado com sucesso!");
      } else {
        setMessage("Erro ao registrar o empréstimo.");
      }

      setUserId("");
      setBookId("");
      setDueDate("");
      fetchLoans();
    } catch (error) {
      setMessage("Erro ao registrar o empréstimo.");
      console.error("Erro ao registrar empréstimo:", error);
    }
  };

  // Função para registrar a devolução
  const handleReturn = async (e) => {
    e.preventDefault();

    // Obter a data atual no formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    if (returnDate < currentDate) {
      setMessage("Data de devolução inválida.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/devolucao/${loanId}`, {
        method: "POST", // Alterado para POST para incluir data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataDevolucao: returnDate, // Envia a data de devolução
        }),
      });

      if (response.ok) {
        setMessage("Livro devolvido com sucesso!");
      } else {
        setMessage("Erro ao devolver o livro.");
      }

      fetchLoans();
    } catch (error) {
      console.error("Erro ao devolver livro:", error);
      setMessage("Erro ao devolver o livro.");
    }
  };

  // Carregar empréstimos ao montar o componente
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="header__title" style={{ fontFamily: "Times New Roman" }}>
          Gerenciamento de Biblioteca
        </h1>
      </header>
      <div className="container">
        {/* Formulário para registrar empréstimo */}
        <div className="form-container" style={{ marginBottom: "40px" }}>
          <h3>Registrar Empréstimo</h3>
          <form onSubmit={handleLoan}>
            <label style={{ marginBottom: "10px" }}>Usuário ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              style={{ flex: 1, width: "10%" }}
            />

            <label style={{ marginRight: "10px" }}>Livro ID:</label>
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
              style={{ flex: 1, width: "10%" }}
            />

            <div>
              <label style={{ marginRight: "10px" }}>Data Limite:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                style={{ width: "13%", marginTop: "10px", padding: "5px" }}
              />
            </div>

            <button type="submit">Registrar Empréstimo</button>
          </form>
        </div>

        {/* Mensagem de feedback */}
        {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

        {/* Lista de empréstimos */}
        <div className="user-list-container">
          <h3 style={{ padding: "20px" }}>Lista de Empréstimos</h3>
          {loans.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID Empréstimo</th>
                  <th>Nome do Livro</th>
                  <th>Nome do Usuário</th>
                  <th>D.devolução</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.livro.titulo}</td>
                    <td>{loan.usuario.nome}</td>
                    <td>{loan.dataLimite}</td>
                    <td>{loan.usuario.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", padding: "10px 0px 13px 0px" }}>
              Nenhum empréstimo ativo encontrado.
            </p>
          )}
        </div>

        {/* Formulário para devolver livro */}
        <div className="form-container" style={{ marginBottom: "40px" }}>
          <h3>Devolução de Livro</h3>
          <form onSubmit={handleReturn}>
            <label style={{ marginBottom: "10px" }}>ID Empréstimo:</label>
            <input
              type="text"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
              style={{ flex: 1, width: "10%" }}
            />

            <div>
              <label>Data de Devolução:</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                style={{ width: "13%", marginTop: "10px", padding: "5px" }}
              />
            </div>
            <button type="submit">Devolver Livro</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;