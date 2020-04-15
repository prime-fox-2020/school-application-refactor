const subjectsModel = require('../models/subjectsModel')

class subjectsController {

  static getSubjects(req, res){
    
    subjectsModel.getSubjects((err, data)=>{
      if (err) res.render(err, {error: err})
      else res.render('subjects', { data })
    })
  }

  static getId(req, res){
    subjectsModel.getId(req.params.id, (err, data)=>{
      if (err) {
        res.render('error', {error: err})
      } else {
        res.render('subjects', { data: data, alert: '' })
      }
    })
  }
}

module.exports = subjectsController