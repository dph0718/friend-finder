function Friend(firstName, lastName, pic, friendScores, gender, iso) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.iso = iso;
    this.photo = pic;
    this.friendScores = friendScores;
    function getSum(total, num) {
        return total + num;
    }
    this.friendScore = this.friendScores.reduce(getSum);
};

const friendObjects = [];
const friends = [{
    firstName: "Barb",
    lastName: "Holland",
    friendScore: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    photo: "/images/barb.png",
    gender: "female",
    iso: "male"
},
{
    firstName: "Harry",
    lastName: "Smith",
    friendScore: [9, 8, 8, 9, 9, 9, 9, 9, 9, 9],
    photo: "/images/harry.png",
    gender: "male",
    iso: "female"
},
{
    firstName: "Nigel",
    lastName: "Thornberry",
    friendScore: [5, 2, 7, 6, 2, 6, 5, 2, 4, 3],
    photo: "/images/nigel.png",
    gender: "male",
    iso: "female"
}, {
    firstName: "Francesca",
    lastName: "Oddone",
    friendScore: [8, 5, 9, 2, 7, 8, 3, 9, 10, 10],
    photo: "/images/francesca.png",
    gender: "female",
    iso: "female"
},
{
    firstName: "Emma",
    lastName: "Stone",
    friendScore: [8, 5, 9, 2, 7, 8, 3, 9, 10, 10],
    photo: "/images/emma.png",
    gender: "female",
    iso: "male"
},
{
    firstName: "Eddie",
    lastName: "Vedder",
    friendScore: [5, 5, 5, 4, 5, 5, 5, 6, 5, 5],
    photo: "/images/eddie.png",
    gender: "male",
    iso: "female"
},
{
    firstName: "Freddie",
    lastName: "Mercury",
    friendScore: [10, 9, 8, 7, 6, 5, 4, 3, 3, 7],
    photo: "/images/freddie.png",
    gender: "male",
    iso: "no preference"
},
{
    firstName: "Greg",
    lastName: "Raymer",
    friendScore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    photo: "/images/greg.png",
    gender: "male",
    iso: "male"
}];

function makeFriends() {
    friends.forEach(f => {
        f = new Friend(f.firstName, f.lastName, f.photo, f.friendScore, f.gender, f.iso);
        friendObjects.push(f);
    });
};

makeFriends();

module.exports = {
    friends,
    friendObjects
};
