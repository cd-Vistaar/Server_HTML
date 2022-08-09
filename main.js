const fs = require('fs')
const http = require('http')

const getViewUrl = (url)=>{
    if(url =='/'){
        return `views/index.html`
    }
    else{
        return `views${url}.html`
    }
 
}

app = http.createServer((req,response)=>{
    console.log(req.url)
    if(req.url.indexOf('.css')==-1){
        console.log("i am css file")
    
        fs.readFile(`views${req.url}`,(error,data)=>{
            response.writeHead(200,{'Content-Type':'text/css'})
            response.write(JSON.stringify(data))
            response.end()
        })
    }
    
    fs.readFile(getViewUrl(req.url),(error,data)=>{
        if(error){
            response.writeHead(200,{'Content-Type':'text/html'})
            response.write('<h1> File not Found <h1>')
            response.end()
        }
        else{

            response.writeHead(200,{'Content-Type':'text/html'})
            response.write(data)
            response.end()

        }
    })

    
    
})

app.listen(3000)