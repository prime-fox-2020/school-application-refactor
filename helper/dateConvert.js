'use strict'

class DateConvert {
  static dateToString(date){
    date      = date.split("-")
    let bulan = "";
    switch (date[1]) {
        case "01": bulan = "Januari"; break;
        case "02": bulan = "Februari"; break;
        case "03": bulan = "Maret"; break;
        case "04": bulan = "April"; break;
        case "05": bulan = "Mei"; break;
        case "06": bulan = "Juni"; break;
        case "07": bulan = "Juli"; break;
        case "08": bulan = "Agustus"; break;
        case "09": bulan = "September"; break;
        case "10": bulan = "Oktober"; break;
        case "11": bulan = "November"; break;
        case "12": bulan = "Desember"; break;
    }
    return `${date[2]} ${bulan} ${date[0]}`;
  }

  static stringToDate(date){
    date      = date.split(" ");
    let bulan = "";
    switch (date[1]) {
        case "Januari":   bulan = "01"; break;
        case "Februari":  bulan = "02"; break;
        case "Maret":     bulan = "03"; break;
        case "April":     bulan = "04"; break;
        case "Mei":       bulan = "05"; break;
        case "Juni":      bulan = "06"; break;
        case "Juli":      bulan = "07"; break;
        case "Agustus":   bulan = "08"; break;
        case "September": bulan = "09"; break;
        case "Oktober":   bulan = "10"; break;
        case "November":  bulan = "11"; break;
        case "Desember":  bulan = "12"; break;
    }
    return `${date[2]}-${bulan}-${date[0]}`;
  }
}

module.exports = DateConvert;