const pool = require('../sinyal');

class Model {
	static showStudents(callback) {
		const query = 'SELECT * FROM murid';

		pool.query(query, (err, data) => {
			if (err) callback(err, null);
			else {
				callback(null, data.rows);
			}
		});
	}

	static cek(req) {
		let err = [];
		if (!req.first_name) {
			err.push('First name is required');
		}
		if (!req.last_name) {
			err.push('Last name is required');
		}
		if (!req.email) {
			err.push('Email is required');
		}
		if (!req.gender) {
			err.push('Gender is required');
		}
		if (!req.birth_date) {
			err.push('Birth date is required');
		} else if (
			req.birth_date[4] !== '-' ||
			req.birth_date[7] !== '-' ||
			req.birth_date[5] == 1 && req.birth_date[6] == 3 ||
			req.birth_date[8] == 3 && req.birth_date[9] == 2 ||
			req.birth_date.length !== 10 || 	req.birth_date[5] > 1 || req.birth_date[8] > 3
		) {
			err.push('Incorrect Birth Date Format');
		}
		return err;
	}

	static addStudentsPost(newStudents, callback) {
		const first_name = newStudents.first_name;
		const last_name = newStudents.last_name;
		const email = newStudents.email;
		let gender = newStudents.gender;
		const birth_date = newStudents.birth_date;

		let query = `INSERT INTO murid(first_name, last_name, email, gender, birth_date) VALUES($1, $2, $3, $4, $5)`;
		if (gender == 1) {
			gender = 'male';
		} else {
			gender = 'female';
		}

		let params = [ first_name, last_name, email, gender, birth_date ];
		let err = this.cek(newStudents);

		if (err.length > 0) {
			callback(err, null);
		} else {
			pool.query(query, params, (err, data) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, 'berhasil menambahkan murid di studentsAdd');
				}
			});
		}
	}

	static getById(params, callback) {
		let query = `SELECT * FROM murid 
    WHERE id = $1`;

		let kotak = [ params ];

		pool.query(query, kotak, (err, data) => {
			if (err) {
				callback(err, null);
			} else {
				callback(null, data.rows);
			}
		});
	}

	static editGet(params, callback) {
		let query = `SELECT * FROM murid 
		WHERE id = $1`;

		let kotak = [ Number(params) ];
		pool.query(query, kotak, (err, data) => {
			if (err) {
				callback(err);
			} else {
				callback(null, data.rows);
			}
		});
	}

	static editPost(params, body, callback) {
		let query = `UPDATE murid
		SET first_name = $1,
		 last_name = $2,
		 email = $3,
		 gender = $4,
		 birth_date = $5
		WHERE id = $6`;

		let gender = body.gender;
		if (gender == 1) {
			gender = 'male';
		} else {
			gender = 'female';
		}
		let kotak = [ body.first_name, body.last_name, body.email, gender, body.birth_date, Number(params) ];
		let err = this.cek(body);
		if (err.length > 0) {
			callback(err, null);
		} else {
			pool.query(query, kotak, (err, data) => {
				if (err) {
					
					callback(err, null);
				} else {
					callback(null, 'berhasil mengedit data student');
				}
			});
		}
	}

	static getByEmail(email, callback) {
		let query = `SELECT * FROM murid WHERE email = $1`;

		let kotak = [ email ];
		pool.query(query, kotak, (err, data) => {
			if (err) {
				callback(err, null);
			} else {
				callback(null, data.rows);
			}
		});
	}

	static delete(id, callback) {
		let query = 'DELETE FROM murid WHERE id = $1';
		let kotak = [ Number(id) ];

		pool.query(query, kotak, (err, data) => {
			if (err) {
				callback(err, null);
			} else {
		
				callback(null, data.rows);
			}
		});
	}
}

module.exports = Model;
