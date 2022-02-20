const path = require("path");

console.log(path.basename(__filename)); // path_ref.js
console.log(path.dirname(__filename)); ///home/helol/Документы/lern_node/2_section_basic_nodejs/refs
console.log(path.extname(__filename)); // .js

console.log(path.parse(__filename));
console.log(path.parse(__filename).ext);
console.log(path.parse(__filename).base);
console.log(path.parse(__filename).dir);

console.log(path.join(__dirname, "test", "second.html"));
console.log(path.resolve(__dirname, "./test", "/second.html"));
