import db from "../db";

/**
 * Only call this trigger after creating the database you wanted to create
 * @param table_name - This is the name of the table you want to apply the updated_at
 */
const createUpdateTimestampTrigger = async (table_name: string) => {
    const deleteTrigger = `
  DROP TRIGGER IF EXISTS set_timestamp_${table_name}
  ON ${table_name};`;
    const createTrigger = `
  CREATE TRIGGER set_timestamp_${table_name}
  BEFORE UPDATE ON ${table_name}
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();`;
    await db.query(deleteTrigger);
    await db.query(createTrigger);
};

const createUserTable = async () => {
    try {
        const userTableQuery = `
        CREATE TABLE IF NOT EXISTS users(
        uid INT UNIQUE NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(uid)
        );`

        await db.query(userTableQuery);
        await createUpdateTimestampTrigger("users");
    } catch (error: any) {
        console.log("usertable: " + error.message);
    }
};

const createTaskListTable = async () => {
    try {
        const taskListTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks(
        id BIGSERIAL,
        "taskName" VARCHAR(100) NOT NULL,
        description VARCHAR(200),
        completed BOOLEAN NOT NULL DEFAULT false,
        "dueDate" TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
        );`

        await db.query(taskListTableQuery);
        await createUpdateTimestampTrigger("tasks");
    } catch (error: any) {
        console.log("tasklist: " + error.message);
    }
};

const createUserTaskTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS "user_task" (
        uid INT NOT NULL,
        "taskId" INT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(uid, "taskId"),
        FOREIGN KEY(uid) REFERENCES users(uid),
        FOREIGN KEY("taskId") REFERENCES tasks(id)
        );`;

        await db.query(query);
        await createUpdateTimestampTrigger("user_task")
    } catch (error: any) {
        console.log("usertask: " + error.message);
    }
}

const createActivitytTable = async () => {
    try {
        const activityTableQuery = `
        CREATE TABLE IF NOT EXISTS activities(
        id BIGSERIAL,
        activity VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
        );`

        await db.query(activityTableQuery);
    } catch (error: any) {
        console.log("activitytable: " + error.message);
    }
};

const populateUsers = async () => {
    try {

        const { rows } = await db.query(
            `
            SELECT * FROM users
            WHERE uid=$1
            `,
            ['1']
        );

        if (rows[0]) return;
        const populateUsersQuery = `
    INSERT INTO users (uid, fullname)
    VALUES
    (1, 'Posi Adeyemi'),
    (2, 'Andrew Schultz'),
    (3, 'Reece James'),
    (4, 'Michael Jack'),
    (5, 'Israel Sanya'),
    (6, 'Uniz Draya'),
    (7, 'Maya Andrews'),
    (8, 'Nick Justin'),
    (9, 'Ayo Sadiq'),
    (10,'Harry Lenglet');`;

        await db.query(populateUsersQuery);
    } catch (error: any) {
        console.log("populateUsers: " + error.message);
    };
};

export const initializeDB = async () => {
    const createUpdateTimestampFunction = `
      CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`;

    await db.query(createUpdateTimestampFunction);
    await createUserTable(); // create user table
    await createTaskListTable(); // create table for the task lists
    await createUserTaskTable(); // create table to keep records of users assigned to a task
    await createActivitytTable();
    await populateUsers(); // insert some hard coded user values into the user table
};