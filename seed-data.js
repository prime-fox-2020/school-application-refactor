const pool = require('./config/connection')
const fs = require('fs')

class Seeding{
    static seedStudents(){
        fs.readFile('./data/students.json', 'utf8', (err, data) => {
            if(err){
                console.log(err)
            } else {
                data = JSON.parse(data)
                let query = `
                    INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES
                `
                for(let i = 0; i < data.length; i++){
                    query += `('${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].gender}', '${data[i].birth_date}')`
                    if(i < data.length - 1){
                        query += ', '
                    }
                }

                pool.query(query, (err) => {
                    if(err){
                        console.log(err)
                    } 
                    else {
                        console.log('succes')
                    }
                })
            }
        })
        // fs.readFile('./data/students.json', 'utf8', (err, data) => {
        //     if(err){
        //         console.log(err)
        //     } else {
        //         data = JSON.parse(data)
        //         let query = `
        //             INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES
        //         `
        //         for(let i = 0; i < data.length; i++){
        //             for (let j = 0; j < data[i].birth_date.length; j++) {
        //                 let newDate = ''
        //                 let month;
        //                 let dateSplit = data[i].birth_date.split(' ')
        //                 switch (dateSplit[1]) {
        //                     case 'Januari':
        //                         month = 1
        //                         break;
        //                     case 'Februari':
        //                         month = 2
        //                         break;
        //                     case 'Maret':
        //                         month = 3
        //                         break;
        //                     case 'April':
        //                         month = 4
        //                         break;
        //                     case 'Mei':
        //                         month = 5
        //                         break;
        //                     case 'Juni':
        //                         month = 6
        //                         break;
        //                     case 'Juli':
        //                         month = 7
        //                         break;
        //                     case 'Agustus':
        //                         month = 8
        //                         break;
        //                     case 'September':
        //                         month = 9
        //                         break;
        //                     case 'Oktober':
        //                         month = 10
        //                         break;
        //                     case 'November':
        //                         month = 11
        //                         break;
        //                     case 'Desember':
        //                         month = 12
        //                         break;
                        
        //                     default:
        //                         break;
        //                 }
        //                 newDate += dateSplit[2] + '-' + month + '-' + dateSplit[0]
        //                 query += `('${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].gender}', '${newDate}')`
        //                 if(i < data.length - 1){
        //                     query += ', '
        //                 }
        //             }
        //             console.log(query);
                    
        //             // pool.query(query, (err) => {
        //             //     if(err){
        //             //         console.log(err)
        //             //     } 
        //             //     else {
        //             //         console.log('succes')
        //             //     }
        //             // })
        //         }
        //     }
        // })
    }

    static seedTeachers(){
        fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                data = JSON.parse(data)
                let query = `
                    INSERT INTO teachers (first_name, last_name, email, gender) VALUES
                `
                for(let i = 0; i < data.length; i++){
                    query += `('${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].gender}')`
                    if(i < data.length - 1){
                        query += ', '
                    }
                }

                pool.query(query, (err) => {
                    if (err) {
                        throw(err)
                    } else {
                        console.log('succes');
                    }
                })
            }
        })
    }

    static seedSubjects(){
        fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                data = JSON.parse(data)
                let query = `
                    INSERT INTO subjects (subject_name) VALUES
                `
                for(let i = 0; i < data.length; i++){
                    query += `('${data[i].subject_name}')`
                    if(i < data.length - 1){
                        query += ', '
                    }
                }

                pool.query(query, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('succes');
                    }
                })
            }
        })
    }
}


Seeding.seedStudents()
Seeding.seedTeachers()
Seeding.seedSubjects()