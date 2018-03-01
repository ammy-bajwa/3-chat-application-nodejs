const path = require('path');
const express = require('express');
const app = express();
const publicPatch = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPatch));
app.listen(port,()=>{
    console.log('server is up');
});