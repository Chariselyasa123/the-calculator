const convert = (val) => {
  let lengthVal = val.length;
  let convertSatuan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
  ];
  let units = ["", "Puluh", "Ratus"];
  let say = [];
  let ind;
  let unit;
  for (ind = 0; ind < convertSatuan.length; ind++) {
    if (val[ind] == 0) {
      unit = "";
    } else {
      unit = units[lengthVal - (ind + 1)];
    }
    say.push(convertSatuan[val[ind]], unit);
    if (lengthVal == 3) {
      if (val[lengthVal - 2] == 1) {
        if (val[lengthVal - 1] == 1) {
          let belas = "Sebelas";
          say.splice(2, 4, belas);
        } else if (val[lengthVal - 1] == 0) {
          let puluh = "Sepuluh";
          say.splice(2, 4, puluh);
        } else {
          let belas = "Belas";
          say.splice(2, 4, convertSatuan[val[lengthVal - 1]], belas);
        }
      }
    } else if (lengthVal == 2) {
      if (val[lengthVal - 2] == 1) {
        if (val[lengthVal - 1] == 1) {
          let belas = "Sebelas";
          say.splice(0, 4, belas);
        } else if (val[lengthVal - 1] == 0) {
          let puluh = "Sepuluh";
          say.splice(0, 4, puluh);
        } else {
          let belas = "Belas";
          say.splice(0, 4, convertSatuan[val[lengthVal - 1]], belas);
        }
      }
    }
  }
  if (lengthVal == 3) {
    if (val[0] == 1) {
      say.splice(0, 2, "Seratus");
    }
  }
  return say.join(" ");
};

export const convertPembilang = (value) => {
  let val = parseInt(value).toString().padStart(12, 0);
  let units = ["", "Ribu", "Juta", "Milyar"];
  let unit;
  let slicedVal = [];
  let ind;
  let say = [];
  for (ind = 0; ind < val.length - 1; ind += 3) {
    slicedVal.push(val.slice(ind, ind + 3));
  }
  for (ind = 0; ind < slicedVal.length; ind++) {
    if (slicedVal[ind] == "000") {
      unit = "";
    } else {
      unit = units[slicedVal.length - (ind + 1)];
    }
    say.push(convert(slicedVal[ind]), unit);
  }
  if (slicedVal[2] == "001") {
    say.splice(4, 2, "Seribu");
  }
  return say.join(" ");
};
