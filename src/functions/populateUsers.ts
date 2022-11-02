import db from "../db";

export const populateUsers = async () => {
    try {
        const populateUsersQuery = `
    INSERT INTO users (uid, fullname)
    VALUES(1, "Posi Adeyemi"),
    VALUES(2, "Andrew Schultz"),
    VALUES(3, "Reece James"),
    VALUES(4, "Michael Jack"),
    VALUES(5, "Israel Sanya"),
    VALUES(6, "Uniz Draya"),
    VALUES(7, "Maya Andrews"),
    VALUES(8, "Nick Justin"),
    VALUES(9, "Ayo Sadiq"),
    VALUES(10,"Harry Lenglet");`;

        await db.query(populateUsersQuery);
    } catch (error: any) {
        console.log(error.message);
    };
};
