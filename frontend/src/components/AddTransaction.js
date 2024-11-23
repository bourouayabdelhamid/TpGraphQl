import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import "./AddTransaction.css"; // Ajout du fichier CSS

const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      type
      date
    }
  }
`;

const AddTransaction = ({ compteId }) => {
  const [montant, setMontant] = useState("");
  const [type, setType] = useState("DEPOT");
  const [date, setDate] = useState("");

  const [addTransaction, { data, loading, error }] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!montant || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId: parseInt(compteId, 10),
            montant: parseFloat(montant),
            date: date,
            type: type,
          },
        },
      });
      alert("Transaction added successfully!");
      setMontant("");
      setDate("");
      setType("DEPOT");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div className="transaction-container">
      <h3 className="title">Add Transaction</h3>
      <form onSubmit={handleSubmit} className="transaction-form">
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="montant">Montant:</label></td>
              <td>
                <input
                  type="number"
                  id="montant"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="Enter amount"
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="date">Date:</label></td>
              <td>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="type">Type:</label></td>
              <td>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="DEPOT">Dépot</option>
                  <option value="RETRAIT">Retrait</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
      {error && <p className="error">Error: {error.message}</p>}
      {data && <p className="success">Transaction added successfully!</p>}
    </div>
  );
};

export default AddTransaction;
