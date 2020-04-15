'use strict'

const fs = require('fs');
const {Pool} = require('pg')
const pool = new Pool({ user: 'node', host: 'localhost', database: 'sapmvc', password: 'hacktiv8tugas', port: 5432 })

class Teachers {
    constructor(first_name, last_name, email, gender) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
    }
}

class Students {
    constructor(first_name, last_name, email, gender, birth_date) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }
}

class Subjects {
    constructor(subject_name) {
        this.subject_name = subject_name
    }
}

class Backend {

    static executeQuery = query => new Promise((resolve, reject) => {

        pool.connect()
            .then(client => {
                return client.query(query)
                    .then(result => {
                        client.release();
                        resolve(result.rows)
                    })
                    .catch(err => {
                        client.release();
                        reject(err)
                    })
            })

    })


    static show = (tableSelection) => new Promise((resolve, reject) => {
        let SQL = `SELECT * FROM ${tableSelection} ORDER BY id ASC;`;
        this.executeQuery(SQL)
            .then(result => resolve(result))
            .catch(err => reject(err))
    })

    static findById = (tableSelection, id) => new Promise((resolve, reject) => {

        let SQL = `SELECT * FROM ${tableSelection} WHERE id = ${Number(id)};`
        this.executeQuery(SQL)
            .then(result => resolve(result))
            .catch(err => reject(err))

    })

    static newData = (tableSelection, content) => new Promise((resolve, reject) => {

        // validate the input
        let isDataQualified = true, errorMessage = '';

        Object.keys(content).forEach(el => {
            if (content[el].trim() == '') {
                errorMessage = `/${tableSelection}/add?action=Register&status=error&on=${el}`;
                isDataQualified = false;
                return
            }

            if (el == 'email' && content[el].indexOf('@') == -1) {
                errorMessage = `/${tableSelection}/add?action=Register&status=error&detail=invalid_email`;
                isDataQualified = false;
            }
        })

        if (!isDataQualified) {
            return resolve(errorMessage)
        }

        const column = () => {
            switch (tableSelection) {
                case 'teachers' : return Object.keys(new Teachers());
                case 'students' : return Object.keys(new Students());
                case 'subjects' : return Object.keys(new Subjects());
            }
        }

        const expandValue = () => {
            let value = '';
            for (let i = 1; i <= Object.values(content).length; i++) {
                value += `$${i}, `
            }

            return value.trim().replace(/,$/g, '');
        }

        let SQL = {
            text: `INSERT INTO ${tableSelection} (${column()}) VALUES (${expandValue()})`,
            values : Object.values(content),
        }

        this.executeQuery(SQL)
            .then(() => resolve(`/${tableSelection}?action=Register&succeeded=true`))
            .catch(err => reject(err))

    })

    static delete = (tableSelection, id) => new Promise((resolve, reject) => {

        let SQL = `DELETE FROM ${tableSelection} WHERE id = ${Number(id)}`;

        this.executeQuery(SQL)
            .then(() => resolve(`/${tableSelection}?action=delete&id=${id}&succeeded=true`))
            .catch(err => reject(err))

    })

    static update = (tableSelection, content) => new Promise((resolve, reject) => {

        // validate the input
        let isDataQualified = true, errorMessage = '';

        Object.keys(content).forEach(el => {
            if (content[el].trim() == '') {
                errorMessage = `/${tableSelection}/update?action=update&status=error&on=${el}`;
                isDataQualified = false;
                return
            }

            if (el == 'email' && content[el].indexOf('@') == -1) {
                errorMessage = `/${tableSelection}/update?action=update&status=error&detail=invalid_email`;
                isDataQualified = false;
            }
        })

        if (!isDataQualified) {
            return resolve(errorMessage)
        }

        const columnToUpdate = () => {
            let cache = '';
            Object.keys(content).forEach(el => {
                if (content.hasOwnProperty(el) && el !== 'id') {
                    cache += `${el} = '${content[el]}', `
                }
            })

            return cache.trim().replace(/,$/g, '');
        }

        let SQL = `UPDATE ${tableSelection} SET ${columnToUpdate()} WHERE id = ${content.id};`;

        this.executeQuery(SQL)
            .then(() => resolve(`/${tableSelection}?action=update&id=${content.id}&succeeded=true`))
            .catch(err => reject(err))

    })
}

module.exports = Backend