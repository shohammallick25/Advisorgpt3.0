import express from "express";
import fetch from "node-fetch"; // অথবা node 18+ native fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "sk-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";

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a Bangla legal assistant." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

