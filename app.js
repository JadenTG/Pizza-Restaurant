//Main Const variables
const http = require('http');
const fs = require('fs');

//Website hostname and the port: 127.0.0.1:3200
const hostname = "127.0.0.1";
const port = "3200";

//Defining each main tab
const homePage = fs.readFileSync("main.html");
const menuPage = fs.readFileSync("menu.html");
const aboutPage = fs.readFileSync("about.html");
const contactPage = fs.readFileSync("contact.html");

//responds to the code to transfer over the html to the JS
const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(homePage);
    }
    else if (req.url === "/menu.html"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(menuPage);
    }
    else if (req.url === "/about.html"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(aboutPage);
    }
    else if (req.url === "/contact.html"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(contactPage);
    }

    else if (req.url.match("\.jpg$")){ //the \.jpg$ is a regex code to transfer over the images.
        try{
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpg");
            imgLoc = req.url.replace("/", "./");
            console.log(imgLoc);
            image = fs.readFileSync(imgLoc);
            res.end(image);
        }
        catch{
            res.statusCode = 404;
            res.write("404");
            console.log(req.url);
        }   
    }
    else {
        res.statusCode = 404;
        res.write("404");
        console.log(req.url);
    }
    res.end();
});

//creates the server so that you can see the web page
server.listen(port, hostname, () => {
    console.log("Server is running....");
});