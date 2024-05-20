const express = require('express')
const app = express()
const port = 3000

// const cheerio = require('cheerio');
// const axios = require('axios');


// Enable CORS (import module and use it globally)
const cors = require('cors')
app.use(cors())

// Enable usage of CLI tools
const { spawn } = require('child_process');

// Configure body-parser
const bodyParser = require('body-parser')
// app.use(bodyParser.text({type:"text/plain"}))
app.use(bodyParser.urlencoded({extended:false}))

// Simple Logger =D
function MWLogger (req, res, next){
  console.log(`${req.method} ${req.path} ${req.ip}`)
  next()
}



// Form has a 'outputFormat'field. User selects 'Original', 'mp3', etc.
// Form has a 'path2video' field. This is where video URL goes.
// when user submits the POST-request, the server responds with a file.
app.post("/new",  MWLogger, (req, res) => {
    res.setHeader('Content-Type', ' application/json');
    res.setHeader('Content-Disposition', `attachment`);

    const cmd = 'python3 cvmaker';
    let args = ['-w', '-'];
    const process = spawn(cmd, args, {shell:true});

    process.stdout.on('data', (data)=>{
      res.write(data);
    })

    process.on('close', (code)=>{
      if (code!== 0) console.error(`LONG PIPE process exited with code: ${code}`);
      res.end()
    })

});


app.post("/generate",  MWLogger, (req, res) => {
    console.log(req.body.jsonContent)
  // for (let x of req.body.jsonContent) console.log(x)
    // console.log(JSON.stringify(req.body.jsonContent))
    // res.setHeader('Content-Type', ' application/json');
    // res.setHeader('Content-Disposition', `attachment`);
    //
    // const cmd = 'python3 cvmaker';
    // let args = ['-w', '-'];
    // const process = spawn(cmd, args, {shell:true});
    //
    // process.stdout.on('data', (data)=>{
    //   res.write(data);
    // })
    //
    // process.on('close', (code)=>{
    //   if (code!== 0) console.error(`LONG PIPE process exited with code: ${code}`);
    //   res.end()
    // })

  res.send("<div>hello world!</div>")
});


//App is ready to go!
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

