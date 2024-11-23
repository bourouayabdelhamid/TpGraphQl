import React, { useState } from "react";
import AccountsList from "./components/AccountsList";
import CompteDetails from "./components/compteDetails";
import AddCompte from "./components/AddCompte";

import './App.css';

const App = () => {
  const [selectedCompteId, setSelectedCompteId] = useState(null);

  const handleSelectAccount = (compteId) => {
    setSelectedCompteId(compteId);
  };

  return (
    <div className="App">
     
      
      <div className="add-compte-container">
        <AddCompte />
      </div>

      
        <div className="accounts-list-container">
          <AccountsList onSelectAccount={handleSelectAccount} />
        </div>
      

      {selectedCompteId && (
       
          <div className="compte-details-container">
            <CompteDetails compteId={selectedCompteId} />
          </div>
        
      )}
    </div>
  );
};

export default App;