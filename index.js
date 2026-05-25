const express = require('express');
const app = express();
const wikip = require('wiki-infobox-parser');

//ejs
app.set("view engine", 'ejs');

//routes
app.get('/', (req,res) =>{
    res.render('index');
});

app.get('/index', async (req,response) =>{
    let url = "https://en.wikipedia.org/w/api.php"
    let params = {
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

    //get wikip search string
    try {
        const res = await fetch(url);
        const body = await res.text();
        const result = JSON.parse(body);
        const x = result[3][0];
        const wikiPath = x.substring(30, x.length);
        //get wikip json
        wikip(wikiPath, (err, final) => {
            if (err){
                response.redirect('404');
            }
            else{
                const answers = final;
                response.send(answers);
            }
        });
    } catch(err) {
        response.redirect('404');
    }
});

//port
app.listen(3000, console.log("Listening at port 3000..."))