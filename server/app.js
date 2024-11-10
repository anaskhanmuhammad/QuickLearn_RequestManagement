const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(express.json());

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = authHeader?.split(" ")[1];

    if (!token)
        return res.status(401).json({ message: "Access token required" });

    jwt.verify(token, process.env.JWT_SECRET, (err, User) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.User = User; 
        next();
    });
};

app.post("/signup", async (req, res, next) => {
    console.log(req.body);

    // const {email, password} = req.body;

    try {
        const [existingUser] = await db.query(
            "Select * from User where email = ?",
            [req.body.email]
        );
        if (existingUser.length > 0) {
            console.log("Duplicate Entry!!");
            return res
                .status(400)
                .json({
                    message: "Account already exist",
                    error: "Account already exist",
                });
            // throw new Error('User Already Exist');
        }

        await db.query(
            "Insert into User (email, password, userType) values (?, ?, ?)",
            [req.body.email, req.body.password, req.body.userType]
        );

        res.status(200).json({ message: "Account Created Successfully" });
    } catch (error) {
        console.log("The Error is:", error);
        res.status(500).json({
            message: "Error Occured",
            error: error.message,
        });
    }
});

app.post("/login", async (req, res, next) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const [userData] = await db.query(
            "Select * from User where email = ?",
            email
        );

        if (userData === 0) {
            console.log("Account Not Exist");
            return res
                .status(400)
                .json({
                    message: "Account Not Exist",
                    error: "Account Not Exist",
                });
        } else if (userData[0].password === password) {
            const token = jwt.sign(
                {
                    userID: userData[0].userID,
                    userName: userData[0].userName,
                    userType: userData[0].userType,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION }
            );
            console.log(token);
            res.status(200).json({ token, message: "LoggedIn successfully" });
            // return res.status(200).json({message: 'LoggedIn successfully', userType: userData[0].userType})
        } else {
            return res
                .status(400)
                .json({
                    message: "Incorrect Email or password",
                    error: "Incorrect Email or password",
                });
        }
    } catch (error) {
        console.log("There is some error");
        res.status(500).json({ message: error.message, error: error.message });
    }
});

app.get("/fetch-data", authenticateUser, async (req, res, next) => {
    try {
        const userID = req.User.userID;
        console.log(userID);
        const data = await db.query(
            `SELECT 
            r.requestID,
            r.status,
            r.message,
            r.requestDetails,
            r.lastUpdate,
            u.userName AS alumniName,
            u.email AS alumniEmail,
            a.qualification AS alumniQualification,
            a.experience AS alumniExperience,
            a.achievements AS alumniAchievements,
            a.availabilityDetails AS alumniAvailability
        FROM 
            Request r
        JOIN 
            Student s ON r.studentID = s.studentID
        JOIN 
            Alumni a ON r.alumniID = a.alumniID
        JOIN 
            User u ON a.userID = u.userID
        WHERE 
            s.userID = ?
        `,
            [userID]
        );

        if (!data[0]) {
            throw new Error("Cannot Fetch Data");
        }
        console.log(data[0])
        
        res.status(200).json({ data: data[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});



app.get("/fetch-alumni-data", authenticateUser, async (req, res, next) => {
    try {
        const userID = req.User.userID;
        console.log(userID);
        const data = await db.query(`SELECT 
                a.alumniID,
                a.userID,
                u.userName,
                u.email,
                a.alumniDetails,
                a.experience,
                a.achievements,
                a.availabilityDetails,
                a.qualification
            FROM 
                QuickLearnDatabase.Alumni AS a
            JOIN 
                QuickLearnDatabase.User AS u ON a.userID = u.userID;
        `);

        if (!data[0]) {
            throw new Error("Cannot Fetch Data");
        }
        console.log(data[0])
        
        res.status(200).json({ data: data[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});



app.get("/fetch-recieved-request-data", authenticateUser, async (req, res, next) => {
    try {
        const userID = req.User.userID;
        console.log(userID);
        const data = await db.query(`SELECT 
                r.requestID,
                r.status,
                r.message,
                r.requestDetails,
                r.lastUpdate,
                s.studentID,
                u.userID,
                u.userName,
                u.email,
                u.enrollmentDate,
                s.age,
                s.qualification
            FROM 
                QuickLearnDatabase.Request r
            JOIN 
                QuickLearnDatabase.Student s ON r.studentID = s.studentID
            JOIN 
                QuickLearnDatabase.User u ON s.userID = u.userID
            WHERE 
                 r.alumniID = 2;
        `);

        if (!data[0]) {
            throw new Error("Cannot Fetch Data");
        }
        console.log(data[0])
        
        res.status(200).json({ data: data[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});


app.post("/send-request", authenticateUser, async (req, res, next) => {
    const studentID = req.User.userID;
    const {alumniID, message} =  req.body;
    try {

        const [existingRequest] = await db.query(
            `SELECT * FROM QuickLearnDatabase.Request 
             WHERE studentID = ? AND alumniID = ? AND status != 'Rejected'`,
            [studentID, alumniID]
        );

        if (existingRequest.length > 0) {
            // If a request exists, return a conflict response
            return res.status(409).json({
                message: "Request already exists between this student and alumni",
            });
        }

        // If no existing request, proceed with inserting a new one
        await db.query(
            `INSERT INTO QuickLearnDatabase.Request 
             (studentID, alumniID, message, status, lastUpdate) 
             VALUES (?, ?, ?, 'pending', NOW())`,
            [studentID, alumniID, message]
        );

        res.status(201).json({ message: "Successfully sent the request" });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

    


app.put("/update-request-data", async (req, res, next) => {

    const {id, status} = req.body;

    try {
        const query = `
            UPDATE QuickLearnDatabase.Request 
            SET status = ?, lastUpdate = NOW()
            WHERE requestID = ?;
        `;

        const [result] = await db.execute(query, [status, id]);

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Request not found" });
        }

        res.status(200).send({ message: "Request data updated successfully" });
    } catch (error) {
        console.error("Error updating request data:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Running on address http://localhost:${PORT}`);
});
