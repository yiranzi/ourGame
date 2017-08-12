let makeTable = require("./entrypoint");

let http = require("http");

http.createServer(function (req: any, res: any) {
    res.writeHead(200, { "Content-Type": "text/html" });

    let table = makeTable();
    let html = "<!doctype html>\n\
              <html>\
                <head>\
                    <title>react server render</title>\
                </head>\
                <body>" +
        table +
        "</body>\
              </html>";

    res.end(html);
}).listen(9000, "127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/");