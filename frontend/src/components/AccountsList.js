import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";
import "./AccountList.css"; // Fichier CSS pour les styles

const ListeComptes = ({ onSelectAccount }) => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p className="message">Chargement des comptes...</p>;
  if (error) return <p className="message">Erreur : {error.message}</p>;

  return (
    <div className="table-container">
      <h2 className="table-title">Liste des Comptes</h2>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Solde</th>
            <th>Date de Création</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.allComptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.type}</td>
              <td>{compte.solde} DH</td>
              <td>{new Date(compte.dateCreation).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => onSelectAccount(compte.id)}
                >
                  Voir les détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeComptes;
