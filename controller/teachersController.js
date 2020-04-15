const Model = require('../model/teachersModel');

class TeacherController {
	static getById(req, res) {
		Model.getbyId(req.params.id, (err, data) => {
			
			if (err) {
				res.send(err);
			} else {
				res.render('teachers.ejs', { data });
			}
		});
	}

	static showTeacher(req, res) {
		Model.showTeacher((err, data) => {
			if (err) {
				res.send(err, null);
			} else {
				
				res.render('teachers.ejs', { data });
			}
		});
	}
}

module.exports = TeacherController;
