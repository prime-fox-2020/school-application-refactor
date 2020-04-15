const Model = require('../model/subjectsModel');

class SubjectsController {
	static getById(req, res) {
		Model.getbyId(req.params.id, (err, data) => {
			
			if (err) {
				res.send(err);
			} else {
				res.render('subjects.ejs', { data });
			}
		});
	}

	static showSubject(req, res) {
		Model.showSubject((err, data) => {
			if (err) {
				res.send(err, null);
			} else {
				
				res.render('subjects.ejs', { data });
			}
		});
	}
}

module.exports = SubjectsController;
