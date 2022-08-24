const cookie = require('cookie');
const http = require('http');
const fs = require('fs');
const escapeHtml = require('escape-html');
const port = 8080;

// const server = http.createServer((req, res) => {
//     let cookies = cookie.parse(req.headers.cookie || '');
//     let viewNumberString = cookies.viewnumber;
//     if(viewNumberString){
//         viewnumber = Number(viewNumberString)+1;
//         res.setHeader('Set-Cookie',cookie.serialize('viewnumber',String(viewnumber), {
//             httpOnly:true,
//             maxAge: 60*60*24*7
//         }));
//         res.statusCode = 302;
//         res.setHeader('Location',req.headers.referer || '/');
//         res.end();
//         return;
//     }
//     let cookies1 = cookie.parse(req.headers.cookie || '');
//
//     // Get the visitor name set in the cookie
//     let name = cookies1.viewnumber;
//
//     res.setHeader('Content-Type', 'text/html; charset=UTF-8');
//     res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
//     res.write('<input type="submit" value="Set Name">');
//     res.end('</form>');
// })
//
// server.listen(port,()=>{
//     console.log(`Server is running at http://localhost:${port}`);
// })

function getViews(req ){
    // Parse the cookies on the request


    var cookies = cookie.parse(req.headers.cookie || '');

// Get the visitor views set in the cookie


    var views = cookies.views;

    if(views){
        let viewsNumber = Number(views)+1;
        return viewsNumber;
    }
    else{
        return 0;
    }
}

function creatServer(req, res) {
    let views = getViews(req);
    res.setHeader('Set-Cookie', cookie.serialize('views', views, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
    }));
    console.log(views);
    fs.readFile('./view/home.html', 'utf8', function (err, datahtml) {
        if (err) {
            console.log(err);
        }
        datahtml = datahtml.replace('{views}', views);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(datahtml);
        return res.end();
    });
}

http.createServer(creatServer).listen(8080);