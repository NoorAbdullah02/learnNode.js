// var arr = [1, 2, 3, 4]

// // arr.forEach(function(item){
// //     console.log("Noor " + item)
// // })

// let newarr = arr.map(function (item) {
//     return item;
// })

// console.log(newarr);

// var obj = {
//     name: "Noor",
//     age: 24
// }
  
// console.log(obj.name);

// // function's are object is javascript

// async function abc(){

// let noor = await fetch(`https://randomuser.me/api/`);
// let data = await noor.json();

// console.log(data.results[0]); 
// }
  
// abc();

 
const fs = require('fs');

fs.writeFile("text.txt","Hello WORLD", function(err){
    if (err) console.log(err);
    else console.log("File written successfully");
})

fs.rename("text.txt","newtext.txt",function(err){
    if (err) console.log(err);
    else console.log("File renamed successfully");
})

fs.copyFile("newtext.txt","./copy/copytext.txt",function(err){
    if(err) console.log(err);
    else console.log("File copied successfully");
})

fs.unlink("newtext.txt",function(err){
    if(err) console.log(err);
    else console.log("File deleted successfully");
})