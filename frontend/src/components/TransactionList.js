import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

// Requête GraphQL pour récupérer les transactions d'un compte
const GET_TRANSACTIONS = gql`
  query GetCompteTransactions($compteId: ID!) {
    compteTransactions(compteId: $compteId) {
      id
      montant
      date
      type
    }
  }
`;

const TransactionList = ({ compteId }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { compteId },
  });

  if (loading) return <Message>Chargement des transactions...</Message>;
  if (error) return <Message>Erreur: {error.message}</Message>;

  const transactions = data.compteTransactions;

  if (!transactions || transactions.length === 0) {
    return <Message>Aucune transaction disponible pour ce compte.</Message>;
  }

  return (
    <TransactionContainer>
      <Title>Liste des Transactions</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Type</TableHeader>
            <TableHeader>Montant</TableHeader>
            <TableHeader>Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.montant} €</TableCell>
              <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </TransactionContainer>
  );
};

// Styled Components

const TransactionContainer = styled.div`
  margin: 30px auto;
  max-width: 900px;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #34495e;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Message = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
`;

export default TransactionList;
