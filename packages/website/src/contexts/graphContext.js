import { createContext, useContext, useState } from "react";

const graphContext = createContext();



export const useGraphContext = () => {
    return useContext(graphContext);
};

export const GraphProvider = ({ children }) => {
    const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hudsonhrh/attedancetest';


    async function querySubgraph(query) {
        const response = await fetch(SUBGRAPH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            }),
        });
    
        const data = await response.json();
    
        if (data.errors) {
            console.error('Error fetching data:', data.errors);
            return null;
        }
    
        return data.data;
    }

    async function queryClassAttendance(classSessionID) {
        // Define the GraphQL query for class attendance using template literals
        const ATTENDANCE_QUERY = `
        {
            mintEvents(where: {classSessionID: "${classSessionID}"}) {
              to
            }
        }
        `;
    
        // Use the generic querySubgraph function to fetch the data
        return querySubgraph(ATTENDANCE_QUERY);
    }

    async function checkClassSessionExists(classSessionID) {
        // Define the GraphQL query for class attendance using template literals
        const ATTENDANCE_QUERY = `
        {
            classSessions(where: {sessionId: "${classSessionID}"}) {
              sessionId
            }
        }
        `;
    
        // Use the generic querySubgraph function to fetch the data
        const data = await querySubgraph(ATTENDANCE_QUERY);

        console.log(data)

        if (data.classSessions.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async function queryAccountAdress(hashedTokenID){
        // finds generated wallet adress for a given users google tokenID
        const ACCOUNT_QUERY = `
        {
            accounts(where: {hashedTokenID: "${hashedTokenID}"}) {
              id
            }
        }
        `;

        const data = await querySubgraph(ACCOUNT_QUERY);

        if (data.accounts.length > 0) {
            return data.accounts[0].id;
        }
        else {
            return false;
        }
    }




    const value = {
        queryClassAttendance,
        checkClassSessionExists,
    };

    return (
        <graphContext.Provider value={value}>
            {children}
        </graphContext.Provider>
    );

}