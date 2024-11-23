import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMPTE } from "../graphql/mutations";
import "./AddCompte.css"; // Nouveau fichier CSS

const AjouterCompte = () => {
  const [formData, setFormData] = useState({
    solde: 0,
    dateCreation: "",
    type: "COURANT",
  });

  const [createCompte, { error }] = useMutation(CREATE_COMPTE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCompte({ variables: { compte: formData } });
      alert("Compte créé avec succès !");
      setFormData({ solde: 0, dateCreation: "", type: "COURANT" });
    } catch (err) {
      alert("Échec de la création du compte. Veuillez réessayer.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="solde">Solde</label>
          <input
            type="number"
            name="solde"
            id="solde"
            placeholder="Entrez le solde"
            value={formData.solde}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="dateCreation">Date de Création</label>
          <input
            type="date"
            name="dateCreation"
            id="dateCreation"
            value={formData.dateCreation}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="type">Type de Compte</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>

        <button type="submit" className="button">
          Créer
        </button>
        {error && (
          <p className="error-message">
            Échec de la création du compte : {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AjouterCompte;
