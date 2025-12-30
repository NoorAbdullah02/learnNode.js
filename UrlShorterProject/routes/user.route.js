import { db } from '../db/index.js';
import { userSchema } from '../drizzle/schema.js';
import { LoginValidationSchema, RegisterPostRequestBodySchema } from '../validations/request.validations.js';
import express from 'express';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    const validationResult = await RegisterPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            message: "Invalid Request Body",
            errors: validationResult.error.flatten().fieldErrors
        });
    }

    const { firstName, lastName, email, password } = validationResult.data;


    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.select()
        .from(userSchema)
        .where(eq(userSchema.email, email));

    if (existingUser.length > 0) return res.status(400).json({ message: "User ALready Exists" });

    try {
        const user = await db.insert(userSchema).values({
            email, firstName, lastName, password: hashPassword
        }).returning({ id: userSchema.id });

        return res.status(201).json({
            message: "user Registered Successfully",
            userId: user[0].id
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

router.post('/login', async (req, res) => {
    const validationResult = await LoginValidationSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            message: "Invalid Request Body"
        });
    }

    const { email, password } = validationResult.data;

    const existingUser = await db.select()
        .from(userSchema)
        .where(eq(userSchema.email, email));

    if (existingUser.length === 0) {
        return res.status(400).json({ message: "User Not Exists" });
    }

    const user = existingUser[0];
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // 7 Days
    );

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({ message: "Login successful", token });
});





export default router;

