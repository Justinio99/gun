import express from 'express';
import Gun from 'gun';

const app = express()
const port = 8000;
app.use(Gun.serve)

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost://" + port)
})

Gun({web: server})