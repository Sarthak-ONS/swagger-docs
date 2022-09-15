const express = require("express");
const fileupload = require("express-fileupload");

const app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json())
app.use(fileupload())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 4000



app.get("/", (req, res) => {
    res.send("<h1>Sarthak Agawral</h1>")
})


app.get("/api/v1/gc", (req, res) => {
    res.send("<h1>Greetings from Groupy Coverage</h1>");
})



app.get("/api/v1/getCourses", (req, res) => {
    res.send({
        "name": "Learn Docker",
        "id": 1234,
        "price": 299
    });
})

let courses = [
    {
        "name": "Learn Docker",
        "id": 123,
        "price": 299
    },
    {
        "name": "Learn K8",
        "id": 1234,
        "price": 299
    }, {
        "name": "Learn DevOps",
        "id": 12345,
        "price": 299
    }
]


app.get("/api/v1/getAllCourses", (req, res) => {
    res.send(courses);
})

app.get("/api/v1/getACourse/:courseId", (req, res) => {
    const myCourse = courses.find((course) => course.id == req.params.courseId)
    res.send(myCourse)
})


app.post("/api/v1/addACourse", (req, res) => {
    const newCourse = req.body;
    console.log(newCourse);
    courses.push(newCourse)

    res.send(true)
    console.log(courses);
})

app.get("/api/v1/queryCheckingParamters", (req, res) => {
    const location = req.query.location;
    const device = req.query.device;
    console.log({
        "location": location, "device": device
    });
    res.send({
        "location": location, "device": device
    })
})



app.post("/api/v1/uploadImage", function (req, res) {
    const samplefile = req.files.file

    let path = __dirname + "/images/" + Date.now() + ".jpg"

    console.log(path);

    samplefile.mv(path, (err) => {
        res.send(true)
    })
})

app.listen(PORT, () => {
    console.log(`Started Sever on PORT ${PORT}`);
})