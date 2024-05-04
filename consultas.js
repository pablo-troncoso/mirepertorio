const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "repertorio",
    port: 5432,
});

// Funcion para Datos Asíncrona
const insertar = async (datos) => {
    const sqlQuery = {
        text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3) RETURNING *',
        values: datos,
        rowMode: 'array'
    };
    try {
        const resultado = await pool.query(sqlQuery);
        return resultado.rows[0];

    } catch (error) {
        console.log(error.code);
        return error;
    }
};

// Funcion para Consultar Datos
const consultar = async () => {
    try {
        const resultado = await pool.query('SELECT * FROM repertorio');
        return resultado.rows;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

// Funcion Editar Datos
const actualizar = async (id, datos) => {
    const sqlQuery = {
        text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *`,
        values: [...datos, id],
        rowMode: 'array'
    };
    try {
        const resultado = await pool.query(sqlQuery);
        return resultado.rows[0];
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

// Funcion Eliminar Datos
const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = $1`, [id]);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

module.exports = { insertar, consultar, actualizar, eliminar };
