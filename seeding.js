//untuk insert data

const pool = require('./config/connection')



let data = [
    {
        id: 1,
        first_name: "Joko",
        last_name: "Santoso",
        email: "jokosantoso@sekolah.id",
        gender: "male",
        birth_date: "28 juni 2005"
    },
    {
        id: 2,
        first_name: "Lukman",
        last_name: "Riki",
        email: "lukmanriki@sekolah.id",
        gender: "male",
        birth_date: "13 April 2004"
    },
    {
        id: 3,
        first_name: "Siti",
        last_name: "Nurhayati",
        email: "sitinurhayati@sekolah.id",
        gender: "female",
        birth_date: "12 Mei 2005"
    },
    {
        id: 4,
        first_name: "Rika",
        last_name: "Risti",
        email: "rikaristi@sekolah.id",
        gender: "female",
        birth_date: "3 januari 2005"
    }
]



let queryStudent = `INSERT INTO "students" ("id", "first_name", "last_name", "email", "gender", "birth_date") VALUES `
let arrayData = []
    for(let i = 0; i < data.length; i++) {
    arrayData.push(`{'${data[i].id}', '${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].gender}', '${data[i].birth_date}'}`);
}

queryStudent += arrayData.join(',');

// console.log(queryStudent)
pool.query(queryStudent, (err, result) => {
    if(err) {
        console.log(err)
    } else {
        console.log('succes')
    }
    pool.end()
});
