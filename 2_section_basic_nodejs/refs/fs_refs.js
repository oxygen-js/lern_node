const fs = require("fs");
const path = require("path");

// Create dir
// fs.mkdir(
//     path.join(__dirname, "notes"),
//     (err) => {
//         if (err) {
//             throw new Error();
//         }
//         console.log("Dir created!");
//     }
// );

// Create file
// fs.writeFile(
//     path.join(__dirname, "notes", "my_notes.txt"),
//     "Hello, World!",
//     (err) => {
//         if (err) throw new Error(err);
//         console.log("File created");
//
//         fs.appendFile(
//             path.join(__dirname, "notes", "my_notes.txt"),
//             " From append file",
//             (err) => {
//                 if (err) throw new Error(err);
//                 console.log("File append");
//             }
//         );
//     }
// );

// Read file
// fs.readFile(
//     path.join(__dirname, "notes", "my_notes.txt"),
//     "utf-8",
//     (err, data) => {
//         if (err) throw new Error(err);
//         console.log(data);
//     }
// );

// Rename file
// fs.rename(
//     path.join(__dirname, "notes", "my_notes.txt"),
//     path.join(__dirname, "notes", "notes.txt"),
//     (err) => {
//         if (err) throw new Error(err);
//         console.log("File renamed");
//     }
// );
