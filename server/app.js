const express = require('express');
const db = require('./db/db');
const cors = require('cors');


const app = express();


app.use(cors())

app.use(express.json());

app.post('/signup', async (req, res, next) => {
    console.log(req.body);

    // const {email, password} = req.body;
    
    try {
        const [existingUser] = await db.query('Select * from User where email = ?', [req.body.email]);
        if (existingUser.length > 0) {
            console.log('Duplicate Entry!!')
            return res.status(400).json({message: 'Account already exist', error: 'Account already exist'});
            // throw new Error('User Already Exist');
        }

        await db.query('Insert into User (email, password, userType) values (?, ?, ?)', [req.body.email, req.body.password, req.body.userType]);

        res.status(200).json({message: 'Account Created Successfully'})
        
    } catch (error) {
        console.log("The Error is:", error);
        res.status(500).json({message: 'Error Occured', error: error.message})
    }
})

app.post('/login', async (req, res, next) => {
    console.log(req.body);

    const {email, password} = req.body;

    try {
        const [userData] = await db.query('Select * from User where email = ?', email);

        if (userData === 0) {
            console.log('Account Not Exist');
            return res.status(400).json({message: 'Account Not Exist', error: 'Account Not Exist'});
        }
        else if (userData[0].password === password) {
            return res.status(200).json({message: 'LoggedIn successfully', userType: userData[0].userType})
        }
        else {
            return res.status(400).json({message: 'Incorrect Email or password', error: 'Incorrect Email or password'})
        }


        
    } catch (error) {
        console.log('There is some error');
        res.status(500).json({message: error.message, error: error.message})
    }

})

app.get('/fetch-data', (req, res, next) => {

})

app.post('/update-data', (req, res, next) => {
    
})







const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Running on address http://localhost:${PORT}`);
});