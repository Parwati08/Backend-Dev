
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware: log response time
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
});

// Sample users
const users = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' }
];

// 1. Filter users by name (query param)
app.get('/users', (req, res) => {
    const { name } = req.query;
    const filtered = name
        ? users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
        : users;
    res.json(filtered);
});

// 3. Contact form
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    res.send('Form submitted successfully');
});

// 5. Photo gallery
app.get('/gallery', (req, res) => {
    const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    res.render('gallery', { images });
});

// 6. Simple blog
let posts = [
    { id: 1, title: 'First Post', content: 'Hello world' }
];

app.get('/blog', (req, res) => {
    res.render('blog', { posts });
});

app.get('/blog/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).render('404');
    res.render('post', { post });
});

app.get('/blog/new', (req, res) => {
    res.render('newPost');
});

app.post('/blog', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    res.redirect('/blog');
});

// 4. Custom 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => console.log('Server running on port 3000'));
