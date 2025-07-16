import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Health check / wake-up route
app.get('/', (req, res) => {
  res.send('Draftify backend is awake and running!');
});

// OpenAI client setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Main draft generation endpoint
app.post('/api/generate-draft', async (req, res) => {
  // support either key naming
  const docType = req.body.doc_type || req.body.documentType;
  const { jurisdiction, parties, facts } = req.body;

  if (!jurisdiction || !docType || !facts) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const prompt = \`You are a legal expert. Draft a formal \${docType} under \${jurisdiction} jurisdiction.
Parties: \${parties || 'N/A'}
Facts: \${facts}\`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const draft = completion.choices[0]?.message?.content || '';
    res.json({ draft });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Failed to generate draft.' });
  }
});

app.listen(port, () => {
  console.log(\`✅ Draftify backend running on port \${port}\`);
});
