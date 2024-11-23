import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMPTE_DETAILS } from "../graphql/queries";
import { ADD_TRANSACTION } from "../graphql/mutations";
import styled from "styled-components";

const CompteDetails = ({ compteId }) => {
  const { loading, error, data, refetch } = useQuery(GET_COMPTE_DETAILS, {
    variables: { compteId },
  });

  const [addTransaction, { loading: mutationLoading }] = useMutation(ADD_TRANSACTION);
  const [formData, setFormData] = useState({
    montant: "",
    date: "",
    type: "DEPOT",
  });

  if (loading) return <Message>Chargement...</Message>;
  if (error) return <Message>Erreur: {error.message}</Message>;

  const compte = data.compteById;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId,
            montant: parseFloat(formData.montant),
            date: formData.date,
            type: formData.type,
          },
        },
      });
      setFormData({ montant: "", date: "", type: "DEPOT" }); // Reset form
      refetch(); // Refresh transactions
      alert("Transaction ajoutée avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la transaction:", err.message);
      alert("Échec de l'ajout de la transaction. Réessayez.");
    }
  };

  return (
    <CompteContainer>
      <Title>Informations du Compte</Title>
      <Details>
        <DetailItem><strong>ID:</strong> {compte.id}</DetailItem>
        <DetailItem><strong>Type:</strong> {compte.type}</DetailItem>
        <DetailItem><strong>Solde:</strong> {compte.solde} DH</DetailItem>
        <DetailItem><strong>Date de création:</strong> {new Date(compte.dateCreation).toLocaleDateString()}</DetailItem>
      </Details>

      <TransactionForm onSubmit={handleFormSubmit}>
        <SubTitle>Ajouter une Transaction</SubTitle>
        <FormGroup>
          <label htmlFor="montant">Montant :</label>
          <Input
              type="number"
              name="montant"
              id="montant"
              value={formData.montant}
              onChange={handleInputChange}
              required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="date">Date :</label>
          <Input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="type">Type de Transaction :</label>
          <Select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleInputChange}
              required
          >
            <option value="DEPOT">Dépôt</option>
            <option value="RETRAIT">Retrait</option>
          </Select>
        </FormGroup>
        <SubmitButton type="submit" disabled={mutationLoading}>
          {mutationLoading ? "En cours..." : "Ajouter Transaction"}
        </SubmitButton>
      </TransactionForm>

      <TransactionList>
        <SubTitle>Transactions :</SubTitle>
        {compte.transactions.length > 0 ? (
          <TransactionTable>
            <thead>
              <TableRow>
                <TableHeader>Type</TableHeader>
                <TableHeader>Montant</TableHeader>
                <TableHeader>Date</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {compte.transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableData>{tx.type}</TableData>
                  <TableData>{tx.montant} DH</TableData>
                  <TableData>{new Date(tx.date).toLocaleDateString()}</TableData>
                </TableRow>
              ))}
            </tbody>
          </TransactionTable>
        ) : (
          <Message>Aucune transaction disponible pour ce compte.</Message>
        )}
      </TransactionList>
    </CompteContainer>
  );
};

// Styled Components

const CompteContainer = styled.div`
  margin: 30px auto;
  padding: 30px;
  max-width: 800px;
  background-color: #f1f6f9;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #2d3a3a;
  margin-bottom: 30px;
  font-size: 28px;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  color: #34495e;
  font-size: 22px;
  font-weight: 600;
`;

const Details = styled.div`
  margin-bottom: 30px;
`;

const DetailItem = styled.p`
  font-size: 18px;
  color: #555;
  margin: 8px 0;
`;

const TransactionForm = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 24px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const TransactionList = styled.div`
  margin-top: 40px;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 16px;
  color: #34495e;
  background-color: #f7f7f7;
`;

const TableData = styled.td`
  padding: 12px;
  font-size: 16px;
  color: #555;
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: #7f8c8d;
`;

export default CompteDetails;
