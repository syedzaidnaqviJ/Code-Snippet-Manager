const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

router.post('/', async (req, res) => {
  const { code, language } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Generate a one-line description and 5 comma-separated tags for code snippets." },
        { role: "user", content: `Language: ${language}\nCode: ${code}` }
      ]
    });

    const content = response.data.choices[0].message.content;
    const lines = content.split('\n');
    const description = lines[0].replace("Description:", "").trim();
    const tags = lines[1] ? lines[1].replace("Tags:", "").trim().split(',').map(t => t.trim()) : [];

    const snippet = new Snippet({ code, language, description, tags });
    await snippet.save();
    res.json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
