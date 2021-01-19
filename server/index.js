const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'employeeSystem',

});

app.post('/create', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const wage = req.body.wage
  const position = req.body.position

  db.query('INSERT INTO employees (name, age, country , position, wage) VALUES (?, ?, ? , ?, ?)',
    [name, age, country, wage, position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted")
      }
    })
})

app.get(('/employees'), (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})

app.delete(('/delete/:employeeId'), (req, res) => {
  const id = req.params.employeeId
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})
app.put(('/update/:employeeId'), (req, res) => {
  const id = req.params.employeeId
  const name = req.body.name
  db.query('UPDATE employees SET name=? WHERE id = ?', [name,id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})


const { LineClient } = require('messaging-api-line');

// get accessToken and channelSecret from LINE developers website
const client = new LineClient({
  accessToken: "tjS6wvLEZA3pVDd+ixJp3RXgsmKBGI13VnsegqfzHl5gkhL1VsqrJP3k+1+Lj51TNtxJ978XDkx9KCXcCfQH2+50uBsprLMGDmicBPT/As/6+pJ7I1fYDll125T8Y7fPps+rKQ0c6wRHpMns1Be/8QdB04t89/1O/w1cDnyilFU=",
  channelSecret: "62609062338921b52b7c8f72e35be506",
});



client.getUserProfile("U9200319464df0823ffe4daa9949499f7").then((profile) => {
  console.log(profile);
  // {
  //   displayName: 'LINE taro',
  //   userId: USER_ID,
  //   pictureUrl: 'http://obs.line-apps.com/...',
  //   statusMessage: 'Hello, LINE!',
  // }
});

app.listen(3001, () => {
  console.log("your server is running on port 3001");
})