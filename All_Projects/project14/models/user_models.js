import connectionDB from "../connection/connection.js";

export const createPersons = async (Name, Email, Password) => {
    const qurey = `INSERT INTO Persons (Name,Email,Password) VALUES(?,?,?)`;
    const [result] = await connectionDB.execute(qurey, [Name, Email, Password]);
    return result;
}