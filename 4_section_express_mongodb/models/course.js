const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

class Course {
    constructor(title, price, logo) {
        this.logo = logo;
        this.title = title;
        this.price = price;
        this.id = uuidv4();
    }

    async save() {
        const courses = await Course.getAll();
        courses.push({ title: this.title, logo: this.logo, price: this.price, _id: this.id });

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "courses.json"),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err);
                    resolve(true);
                }
            )
        });
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
        });
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(item => item.id === id);
    }

    static async update(course) {
        const courses = await Course.getAll();

        const idx = courses.findIndex(x => x.id === course.id);
        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "courses.json"),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err);
                    resolve(true);
                }
            )
        });
    }
}

module.exports = Course;
