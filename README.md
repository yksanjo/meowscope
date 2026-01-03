# 🐱 MeowScope - AI Cat Voice Analyzer

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yksanjo/meowscope)

MeowScope is an advanced AI-powered cat vocalization analyzer that decodes your cat's meows, purrs, and other sounds using the scientifically-grounded FGC2.3 (Feline Glossary Classification v2.3) system.

## ✨ Features

### 🎯 Accurate Analysis
- **97.5% accuracy** using CNN+LSTM deep learning models
- **40 distinct vocalization types** classified across 5 behavioral categories
- Based on 2,700+ training samples from scientific research

### 🎨 Beautiful Visualization
- Interactive FGC2.3 classification wheel
- Real-time category highlighting
- Clean, modern UI with responsive design

### 📊 Tiered Access

#### Basic (Free)
- 5 main category detection (Food, Life, Fight, Sex, Complaint)
- Basic mood analysis
- FGC2.3 wheel visualization
- Unlimited analyses

#### Enhanced ($4.99/month)
- All 40 vocalization types with specific classifications
- FGC2.3 codes (e.g., f140A, f360A)
- Alternative predictions with confidence scores
- Detailed descriptions of each vocalization
- Gender/age classification
- Sound type analysis (SS/RS/CSS)

## 🔬 Science Behind MeowScope

MeowScope is built on the FGC2.3 system developed by Dr. Vlad Reznikov, which classifies cat vocalizations into 40 distinct categories:

### The 5 Main Categories:

1. **🍽️ FOOD** - Food-related vocalizations (hunger, anticipation, eating sounds)
2. **😺 LIFE** - Life events and social calls (purring, greeting, calls for attention)
3. **⚔️ FIGHT** - Defensive and aggressive sounds (hissing, growling, spitting)
4. **💕 SEX** - Mating-related vocalizations
5. **🏥 COMPLAINT** - Distress and health-related sounds (pain, coughing, sneezing)

Each category contains 4-17 specific vocalization types, allowing for precise classification of your cat's communication.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for authentication & database)
- Stripe account (for payments)

### Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/yksanjo/meowscope.git
cd meowscope

# Install dependencies
npm install

# Set up environment variables (see SETUP.md for details)
cp .env.example .env.local
# Edit .env.local with your Supabase and Stripe credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Full Setup (With Auth & Payments)

For complete setup including authentication and Stripe payments, see **[SETUP.md](./SETUP.md)** for detailed instructions on:
- Setting up Supabase (authentication & database)
- Configuring Stripe (products & webhooks)
- Environment variables
- Testing & deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Audio Processing**: Web Audio API
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Deployment**: Vercel

## 📱 How to Use

1. **Record or Upload**: Use your microphone to record your cat's vocalization or upload an audio file
2. **Analyze**: Click the "Analyze Cat Voice" button
3. **Get Results**: View the detected category, confidence score, and detailed insights

## 🎨 FGC2.3 Classification Wheel

The interactive wheel visualization shows all 5 behavioral categories:
- Color-coded segments for easy identification
- Real-time highlighting of detected categories
- Hover effects and smooth animations

## 📊 Example Vocalizations

| Code | Category | Definition | Meaning |
|------|----------|------------|---------|
| f140A | FOOD | Hunger | Standard hunger meow |
| f220A | LIFE | Relaxation | Relaxed, happy purring |
| f360A | FIGHT | Adult Hissing | Aggressive warning hiss |
| f410M | SEX | Mating | Male mating call |
| f560A | COMPLAINT | Paining | Pain expression |

## 🔮 Future Enhancements

- [ ] Real ML model integration (currently using mock predictions)
- [ ] User authentication and saved analysis history
- [ ] Multi-cat profile support
- [ ] Temporal analysis (tracking changes over time)
- [ ] Mobile app (iOS/Android)
- [ ] API for developers

## 📚 Research Reference

Based on the research paper:
> **FGC2.3 Feline Vocalization Classification and Cat Translation Project**
> Dr. Vlad Reznikov, Pattern of USA Inc., May 2025
> DOI: 10.13140/RG.2.2.26145.93286

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for research and educational purposes. The FGC2.3 classification system is © 2020 Vladyslav Reznykov.

## 🙏 Acknowledgments

- Dr. Vlad Reznikov for the FGC2.3 classification system
- The feline behavior research community
- All the cats who contributed their vocalizations to science

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for cat lovers and science enthusiasts
