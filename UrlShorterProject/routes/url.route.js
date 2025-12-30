import express from 'express';
import { authenticationMiddleware } from '../middleware/authMiddleware.js';
import { shortenUrlCheck } from '../validations/request.validations.js';
import { db } from '../db/index.js'
import { userSchema, userUrl } from '../drizzle/schema.js';
import { nanoid } from 'nanoid';
import { and, eq } from 'drizzle-orm';

const router = express.Router();


router.post('/shortUrl', authenticationMiddleware, async (req, res) => {

    const validationResult = await shortenUrlCheck.safeParseAsync(req.body);


    if (!validationResult.success) {
        return res.status(400).json({
            message: "Invalid Request Body",
            errors: validationResult.error.flatten().fieldErrors
        });
    }

    const { url, code } = validationResult.data;

    const shortCode = code ?? nanoid(8);


    // shortCode already exists check
    const existing = await db.select()
        .from(userUrl)
        .where(eq(userUrl.shorturl, shortCode));

    if (existing.length > 0) {
        return res.status(400).json({ message: "Short code already exists, please try another" });
    }

    const [result] = await db.insert(userUrl).values({
        shorturl: shortCode,
        url,
        userId: req.user.id
    }).returning({
        id: userUrl.id,
        shorturl: userUrl.shorturl,
        url: userUrl.url,
        userID: userSchema.id
    });

    return res.status(201).json({
        id: result.id,
        shorturl: result.shorturl,
        Original_Url: result.url,
        userID: result.userID,
        FinalUrl: `${process.env.BASE_URL}/${result.shorturl}`
    })

})


router.post('/codes', authenticationMiddleware, async (req, res) => {
    try {
        const codes = await db.select()
            .from(userUrl)
            .where(eq(userUrl.userId, req.user.id));

        return res.status(200).json({ codes });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})


router.delete('/:id', authenticationMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        await db.delete(userUrl)
            .where(and(
                eq(userUrl.id, id),
                eq(userUrl.userId, req.user.id)
            ))

        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})  


router.get("/:shortcode", async (req, res) => {
    const code = req.params.shortcode;

    try {
        const [result] = await db
            .select()
            .from(userUrl)
            .where(eq(userUrl.shorturl, code));
        if (!result) {
            return res.status(404).json({
                message: "Invalid URL"
            })
        }

        res.redirect(result.url);

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

})


export default router;