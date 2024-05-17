//конструктор об'єкту
class DAI {
    constructor(name, surname, fathername, car, car_num, color_car) {
        this.name = name;
        this.surname = surname;
        this.fathername = fathername;
        this.car = car;
        this.car_num = car_num;
        this.color_car = color_car;
        this._code = getRandomNumber();
    }

    get code() {
        return this._code;
    }


    Info() {
        return `Code: ${this._code},\n Name: ${this.name},\nSurname: ${this.surname},\nFathers Name: ${this.fathername},\nCar: ${this.car},\nCar Number: ${this.car_num},\nCar Color: ${this.color_car}`;
    }
}


//колекція об'єктів
class DaiUsers {

    constructor() {
        this.items = [];
    }

    add(user) {
        if ((user instanceof DAI) == false) { throw `${user} is not in log in` };
        this.items.push(user);
    }

    add_collection(users) {
        for (let i = 0; i < users.length; i++) {
            this.items.push(users[i]);
        }
    }

    quantity() {
        return this.items.length;
    }

    getByCode(code) {
        return this.items.find(user => user.code == code);
    }

    getByCarAndColor(car, color) {
        return this.items.filter(user => user.car == car && user.color_car == color);
    }

    getAll() {
        return [...this.items];
    }

    update(code, newData) {
        let user = this.getByCode(code);
        if (!user) {
            throw new Error("User not found.");
        }
        for (let key of ["name", "surname", "fathername", "car", "car_num", "color_car"]) {
            user[key] = newData[key];
        }
    }

    remove(code) {
        const index = this.items.findIndex(user => user.code == code);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

}


//рандомний код юзера
let generatedNumbers = [];
function getRandomNumber() {
    let randomNum = Math.floor(Math.random() * (19999 - 10001)) + 10000;
    if (generatedNumbers.includes(randomNum)) {
        getRandomNumber();
    }
    else {
        generatedNumbers.push(randomNum);
        return randomNum;
    }

}

//створення юзера

let users = new DaiUsers();

function createUser1() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let fathername = document.getElementById("fathername").value;
    let car = document.getElementById("car").value;
    let car_num = document.getElementById("car_num").value;
    let color_car = document.getElementById("color_car").value;

    let person = new DAI(name, surname, fathername, car, car_num, color_car);
    users.add(person);

    let table = document.getElementById("usersTable");
    let tableBody = table.getElementsByTagName('tbody')[0];
    let newRow = tableBody.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);
    let cell8 = newRow.insertCell(7);

    cell1.textContent = person.name;
    cell2.textContent = person.surname;
    cell3.textContent = person.fathername;
    cell4.textContent = person.car;
    cell5.textContent = person.car_num;
    cell6.textContent = person.color_car;
    cell7.textContent = person.code;


    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        users.remove(person.code);
        newRow.remove();
    };
    cell8.appendChild(deleteButton);

}




function FindUser() {
    let id = document.getElementById("userIdInput").value;
    let user = users.getByCode(id);
    if (user) {
        alert(user.Info());
    } else {
        alert("User not found.");
    }
}

function UpdateUser() {
    let code = document.getElementById("code").value;
    let user = users.getByCode(code);
    if (user) {

        let table = document.getElementById("usersTable");
        let tableBody = table.getElementsByTagName('tbody')[0];
        let newRow = tableBody.insertRow();

        user.name = document.getElementById("uname").value;
        user.surname = document.getElementById("usurname").value;
        user.fathername = document.getElementById("ufathername").value;
        user.car = document.getElementById("ucar").value;
        user.car_num = document.getElementById("ucar_num").value;
        user.color_car = document.getElementById("ucolor_car").value;

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);
        let cell7 = newRow.insertCell(6);
        let cell8 = newRow.insertCell(7);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            users.remove(user.code);
            newRow.remove();
        };
        cell8.appendChild(deleteButton);


        cell1.textContent = user.name;
        cell2.textContent = user.surname;
        cell3.textContent = user.fathername;
        cell4.textContent = user.car;
        cell5.textContent = user.car_num;
        cell6.textContent = user.color_car;
        cell7.textContent = user.code;

    } else {
        alert("User not found.");
    }
}

