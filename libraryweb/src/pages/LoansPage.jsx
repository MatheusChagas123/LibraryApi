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
  const [message, setMessage] = useState("");

  // Função para buscar empréstimos
  const fetchLoans = async () => {
    try {
      const response = await fetch(`${baseUrl}/todos`);
      const data = await response.json();

      if (response.ok) {
        setLoans(data);
      } else {
        setLoans([]);
        setMessage("Erro ao buscar empréstimos.");
      }
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
      setLoans([]);
      setMessage("Erro ao carregar os empréstimos.");
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
        setMessage("Empréstimo registrado com sucesso!");
      } else if (response.status === 400) {
        setMessage("O usuário atingiu o limite de 5 empréstimos!");
      } else {
        setMessage("Erro ao registrar empréstimo.");
      }

      setUserId("");
      setBookId("");
      setDueDate("");
      fetchLoans();
    } catch (error) {
      setMessage("Erro ao registrar empréstimo.");
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();

    // Obter a data atual no formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    if (returnDate < currentDate) {
      setMessage("A data de devolução não pode ser anterior à data atual.");
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
        setMessage("Livro devolvido com sucesso!");
        fetchLoans();
      } else {
        setMessage("Erro ao devolver livro.");
      }
    } catch (error) {
      console.error("Erro ao devolver livro:", error);
      setMessage("Erro ao devolver livro.");
    }
  };

  // Carregar empréstimos ao montar o componente
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div class="container">
      <header style={{ marginBottom: "15px" }} className="header">
        <h1 className="header__title">Gerenciamento de Biblioteca</h1>
      </header>

      {/* Mensagem de resposta */}
      {message && (
        <div
          style={{
            color: "green",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

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
      <div className="user-list-container">
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
          <p style={{extalign: "center",}}>Nenhum empréstimo ativo encontrado.</p>
        )}
      </div>

      <div className="form-container" style={{ marginBottom: "40px" }}>
        {/* Formulário para devolver livro */}
        <h3>Devolução de Livro</h3>
        <form onSubmit={handleReturn}>
            <label style={{ marginBottom: "10px" }} >ID Empréstimo:</label>
            <input
              type="text"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
              style={{ flex: 1, width: "10%", }}
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
  );
};

export default LoansPage;
