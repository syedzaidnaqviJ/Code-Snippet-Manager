const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  tags: [String],
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Snippet', SnippetSchema);
