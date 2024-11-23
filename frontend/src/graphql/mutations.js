import { gql } from '@apollo/client';

export const CREATE_COMPTE = gql`
  mutation CreateCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      type
    }
  }
`;
