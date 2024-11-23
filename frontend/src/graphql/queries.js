import { gql } from '@apollo/client';

export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
      transactions {
        id
        montant
        type
        date
      }
    }
  }
`;

export const GET_COMPTE_DETAILS = gql`
  query GetCompteDetails($compteId: ID!) {
    compteById(id: $compteId) {
      id
      solde
      dateCreation
      type
      transactions {
        id
        montant
        type
        date
      }
    }
  }
`;
