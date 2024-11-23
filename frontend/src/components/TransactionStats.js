import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const GET_TRANSACTION_STATS = gql`
    query GetTransactionStats {
        transactionStats {
            count
            sumDepots
            sumRetraits
        }
    }
`;

const TransactionStats = () => {
    const { data, loading, error } = useQuery(GET_TRANSACTION_STATS);

    if (loading) return <Message>Loading stats...</Message>;
    if (error) return <Message error>Error: {error.message}</Message>;

    const { count, sumDepots, sumRetraits } = data?.transactionStats || {};

    return (
        <StatsContainer>
            <Title>Transaction Stats</Title>
            <StatsItem>
                <Label>Total Transactions:</Label> {count ?? "No transactions found"}
            </StatsItem>
            <StatsItem>
                <Label>Total Dépots:</Label> {formatCurrency(sumDepots) ?? "0.00"}
            </StatsItem>
            <StatsItem>
                <Label>Total Retraits:</Label> {formatCurrency(sumRetraits) ?? "0.00"}
            </StatsItem>
        </StatsContainer>
    );
};

// Helper function to format currency
const formatCurrency = (amount) => {
    return amount
        ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
          }).format(amount)
        : null;
};

// Styled Components

const StatsContainer = styled.div`
    margin: 30px auto;
    padding: 25px;
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #e1e1e1;
`;

const Title = styled.h3`
    font-size: 1.8rem;
    color: #2c3e50;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin-bottom: 25px;
`;

const StatsItem = styled.div`
    font-size: 1.4rem;
    margin: 18px 0;
    color: #34495e;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
        color: #6780b9;
        background-color: #ecf0f1;
        border-radius: 5px;
    }
`;

const Label = styled.span`
    font-weight: bold;
    color: #16a085;
`;

const Message = styled.p`
    font-size: 1.2rem;
    color: ${({ error }) => (error ? "#e74c3c" : "#9898df")};
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
    text-transform: capitalize;
    padding: 10px;
    border: 1px solid ${({ error }) => (error ? "#e74c3c" : "#7598db")};
    border-radius: 5px;
    background-color: ${({ error }) => (error ? "#f8d7da" : "#d0e9f7")};
`;

export default TransactionStats;
