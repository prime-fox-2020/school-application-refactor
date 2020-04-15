const Model = require('../model/studentsModel');

class Controller {
	static showStudents(req, res) {
		Model.showStudents((err, data) => {
			if (err) {
				throw err;
			} else {
				res.render('students.ejs', { data });
			}
		});
	}

	static addStudents(req, res) {
		const error = req.query.error;
		res.render('studentsAdd', { error });
	}
	static addStudentsPost(req, res) {
		Model.addStudentsPost(req.body, (err, data) => {
			if (err) {
				if (Array.isArray(err)) {
					res.redirect(`/students/add/?error=${err.join(',')}`);
				} else {
					res.send(err);
				}
			} else {
				res.redirect('/students');
			}
		});
	}

	static getById(req, res) {
		Model.getById(req.params.id, (err, data) => {
			if (err) {
				res.send(err);
			} else {
				// console.log(data)
				res.render('students.ejs', { data });
			}
		});
	}

	static editGet(req, res) {
		Model.editGet(req.params.id, (err, data) => {
			if (err) {
				res.send(err);
			} else {
				const error = req.query.error;

				res.render('studentsEdit.ejs', { data, error: error });
			}
		});
	}

	static editPost(req, res) {
		Model.editPost(req.params.id, req.body, (err, data) => {
			if (Array.isArray(err)) {
				res.redirect(`/students/${req.params.id}/edit/?error=${err.join(',')}`);
			} else {
				if (err) {
					res.send(err);
				} else {
					res.redirect('/students');
				}
			}
		});
	}

	static getByEmail(req, res) {
		Model.getByEmail(req.params.email, (err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.render('students.ejs', { data });
			}
		});
	}

	static delete(req, res) {
		Model.delete(req.params.id, (err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.redirect('/students');
			}
		});
	}
}

module.exports = Controller;
