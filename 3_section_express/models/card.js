const fs = require("fs");
const path = require("path");

class Card {
    constructor() {}

    static async get() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "card.json"),
                "utf-8",
                (err, content) => {
                    if (err) reject(err);
                    resolve(JSON.parse(content));
                }
            )
        });
    }

    static async add(course) {
        const card = await Card.get();

        const idx = card.courses.findIndex(x => x.id === course.id);
        const candidate = card.courses[idx];

        if (candidate) {
            candidate.count++;
            card.courses[idx] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.all_price += Number(course.price);
        
        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "card.json"),
                JSON.stringify(card),
                (err) => {
                    if (err) rej(err);
                    res(true);
                }
            )
        });
    }
}

module.exports = Card;
