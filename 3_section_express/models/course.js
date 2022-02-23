const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

class Course {
    constructor(title, price, logo) {
        this.logo = logo;
        this.title = title;
        this.price = price;
        this._id = uuidv4();
    }

    async save() {
        const courses = await Course.getAll();
        courses.push({ title: this.title, logo: this.logo, price: this.price, _id: this._id });

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "courses.json"),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err);
                    resolve(true);
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "courses.json"),
                "utf-8",
                (err, content) => {
                    if (err) rej(err);
                    res(JSON.parse(content));
                }
            )
        })
    }
}

module.exports = Course;
