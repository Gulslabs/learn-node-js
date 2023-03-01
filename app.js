const express = require('express')
const path = require('path')
const app = express()

app.listen(3000);
app.get('/', (req, resp) => {
    console.log("Resoved ", path.resolve(__dirname, "./views/index.html"))
    resp.sendFile(path.resolve(__dirname, "./views/index.html"));
    //resp.sendFile("./views/index.html", {root: __dirname});
});

app.get('/about', (req, resp) => {
    resp.sendFile("./views/about.html", { root: __dirname });
});


app.get('/about-us', (req, resp) => {
    resp.redirect("/about");
});
// Use has to be at the last. as its not scoped to any particular URL. Like a Catch All. 
app.use((req, resp) => {
    resp.status(404).sendFile("./views/404.html", { root: __dirname });
});
