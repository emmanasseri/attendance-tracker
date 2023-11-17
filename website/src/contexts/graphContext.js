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
        const string = hashedTokenID.toString();
        const ACCOUNT_QUERY = `
        {
            users(where: {authId: "${string}"}) {
              id
              address
              balance
              timestamp
              authId
            }
          }
        `;

        const data = await querySubgraph(ACCOUNT_QUERY);

        console.log(data)

        if (data.users.length > 0) {
             return data.users[0].id;
         }
         else {
             return false;
         }
    }

    async function queryClassesByTeacher(teacherAddress) {
        const query = `
            query {
                classes(where: {teacher: "${teacherAddress}"}) {
                    name
                }
            }
        `;
        if(!teacherAddress){
            return false;
        }

        
        const data = await querySubgraph(query);
        console.log(data)

  



        if(data.classes.length > 0) {
            return data.classes;
        }
        else {
            return false;
        }
    }
    




    const value = {
        queryClassAttendance,
        checkClassSessionExists,
        queryAccountAdress,
        queryClassesByTeacher
    };

    return (
        <graphContext.Provider value={value}>
            {children}
        </graphContext.Provider>
    );

}