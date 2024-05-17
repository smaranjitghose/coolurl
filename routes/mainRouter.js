const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrlModel");

router.get("/", (req, res) => {
    res.send("Welcome to Fantastic URL Genie");
});

router.get("/about", (req, res) => {
    res.send("A simple URL shortener service created using Express and MongoDB");
});

router.get('/:shortCode', async (req, res, next) => {
    const shortCode = req.params.shortCode;

    try {
        const url = await ShortUrl.findOne({ shortCode });
        if (url) {
            await ShortUrl.updateOne({ shortCode }, { $inc: { clicks: 1 } });  // Increment clicks (optional)
            return res.redirect(url.originalUrl);
        }

        res.status(404).json({ message: 'Short URL not found' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
