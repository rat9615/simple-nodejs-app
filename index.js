const express = require('express');
const app = express();
const request = require('request');
const wikip = require('wiki-infobox-parser');

//ejs
app.set("view engine", 'ejs');

//routes
app.get('/', (req,res) =>{
    res.render('index', { search : 'null'});
});

app.get('/index', (req,res) =>{
    let url = "https://en.wikipedia.org/w/api.php"
    var params = {
        action: "opensearch",
        search: req.query.person,
        limit: "1",
        namespace: "0",
        format: "json"
    }

    url = url + "?"
    Object.keys(params).forEach( (key) => {
        url += '&' + key + '=' + params[key]; 
    });

    request(url, (err, res, body) =>{
        if(err) {
            res.render('404');
        }
        let result = JSON.parse(body);
        let x = result[3][0];
        x = x.substring(30, x.length);
        res.locals.y = req.x;
    });
    wikip(res.locals.x, (err,final) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(final);
        }
      });
});


//port
app.listen(3000, console.log("Listening at port 3000..."))