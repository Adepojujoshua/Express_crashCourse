
const express = require('express');
const path = require('path');
const hbs = require('hbs')
const logger = require('./middleware/logger');
const members = require('./Members')
const app = express();


// app.use(logger)

// Handlebars middleware

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));



// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // to handle forms

app.get('/',(req,res)=>{
    res.render('index.hbs', {title:'Members app', members});
})

app.use(express.static(path.join(__dirname,'public')));
app.use('/api/members', require('./routes/api/members'))



// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
});