const express = require('express')
const path = require('path');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://blogs-dev:test1234@guls-mongodb-cluster.2xpkeu2.mongodb.net/blogs-db?retryWrites=true&w=majority';
const port = 3001;
const Blog = require('./models/blog');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

mongoose.connect(dbUri, {
    useNewUrlParser: true
}).then((result) => app.listen(port, () => console.log(`App listening to port ${port}`))).
    catch((error) => console.log("Error Connecting to Mongo Atlast ", error));





// middleware static Files. looks for style.css in public folder(refered in head.ejs)
app.use(express.static('public'));

app.use(morgan('dev'));

mongoose.connect(dbUri)

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'My First Mongo Blog',
        body: 'Body of My New Blog',
        snippet: 'Snippet of my New Blog'
    });
    blog.save().then((result) => res.send(result)).catch(err => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find().then(result => res.send(result)).catch(err => console.log(err));
});

app.get('/single-blog', (req, res)=> {
    Blog.findById('63f322d2a8a302ff73133c39').then(result => res.send(result)).catch(err => console.log(err));
}); 

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})