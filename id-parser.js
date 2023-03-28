const tesseract = require("node-tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

tesseract
  .recognize("image.png", config)
  .then((text) => {

    // Converting text data to an array
    const arr = text.split("\n");
    // removing new line symbols from strings
    for(var i = 0; i < arr.length; ++i){
    arr[i] = arr[i].replace(/(\r\n|\n|\r)/gm, "").replace(/ \*/g, "");
    }
    var newArr = arr.filter(el => el.trim());

    // converting names from All Caps to only first word Caps
    const formattedArr = newArr.map(str => {
      const words = str.toLowerCase().split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      return capitalizedWords.join(' ');
    });

    let idType = "";
    if(formattedArr[1] === "Income Tax Department"){
      idType = "panCard";
    }else{
      idType = formattedArr[1];
    }
  
    
    let data = {
      idType: idType,
      idNumber: arr[10] + "",
      info : {
        name: formattedArr[2] + "",
        fatherName: formattedArr[3] + "",
        dob: formattedArr[4] + "",
      }
    }
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
  })
  .catch((error) => {
    console.log(error.message)
  });