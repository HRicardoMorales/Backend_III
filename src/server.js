import { app, connectDB } from './app.js';

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err?.message || err);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
