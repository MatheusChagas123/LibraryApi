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

  const handleLoan = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/aluga`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId: userId,
          livroId: bookId,
          dataLimite: dueDate,
          status: "PENDENTE",
        }),
      });

      if (response.ok) {
        // Handle success (optional feedback)
      } else if (response.status === 400) {
        // Handle specific error (optional feedback)
      } else {
        // Handle other errors (optional feedback)
      }

      setUserId("");
      setBookId("");
      setDueDate("");
      fetchLoans();
    } catch (error) {
      // Handle error (optional feedback)
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();

    // Obter a data atual no formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    if (returnDate < currentDate) {
      // Optionally handle invalid return date
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/devolucao/${loanId}`, {
        method: "DELETE", // Alterado para POST para incluir data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataDevolucao: returnDate, // Envia a data de devolução
        }),
      });

      if (response.ok) {
        fetchLoans();
      } else {
        // Handle error (optional feedback)
      }
    } catch (error) {
      console.error("Erro ao devolver livro:", error);
    }
  };

  // Carregar empréstimos ao montar o componente
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1 class="header__title" style={{ fontFamily: "Times New Roman" }}>
          Gerenciamento de Biblioteca
        </h1>
      </header>
      <div class="container">
        {/* Formulário para registrar empréstimo */}
        <div class="form-container" style={{ marginBottom: "40px" }}>
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

        {/* Lista de empréstimos */}
        <div class="user-list-container">
          <h3 style={{ padding: "20px" }}>Lista de Empréstimos</h3>
          {loans.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID Empréstimo</th>
                  <th>Nome do Livro</th>
                  <th>Nome do Usuário</th>
                  <th>D.empréstimo</th>
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
                    <td>{loan.dataEmprestimo}</td>
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
        <div class="form-container" style={{ marginBottom: "40px" }}>
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
