const users = [
  {
    name: "Ivan",
    age: 29,
    email: "p@p.p"
  },
  {
    name: "A",
    age: 22,
    email: "a@a.a"
  }
]

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users
    }
  },

  random({min, max, count}) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(Math.random() * (max - min) + min);
    }

    return arr;
  },

  addTestUser({user: {name, email}}) {

    const user = {
      name,
      age: Math.trunc(Math.random() * 30),
      email
    }

    users.push(user)

    return user;
  }
};
