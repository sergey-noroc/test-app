const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = './data.json';
const fs = require('fs');
const path = require('path');
const usersData = require(filePath);

app.get("/api/v1/users", (req, res) => {
    res.json(usersData);
});

app.get('/api/v1/users/:id', (req, res) => {
    const { id } = req.params;
    const user = usersData.find(m => m.id === id);

    return res.json(user)
});

app.post('/api/v1/users', (req, res) => {
    const user = req.body;
    usersData.push(user);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(usersData, null, 2);
    fs.writeFile(pathToFile, stringifiedData, (err) => {
        if (err) {
            return res.status(422).send(err);
        }

        return res.json('User has been succesfuly added!');
    });
});

app.delete('/api/v1/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = usersData.findIndex(m => m.id === id)
    usersData.splice(userIndex, 1);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(usersData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
        if (err) {
            return res.status(422).send(err);
        }

        return res.json('User has been succesfuly deleted!');
    });
});

app.patch('/api/v1/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const userIndex = usersData.findIndex(m => m.id === id);

    usersData[userIndex] = user;

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(usersData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
        if (err) {
            return res.status(422).send(err);
        }

        return res.json(user);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});





