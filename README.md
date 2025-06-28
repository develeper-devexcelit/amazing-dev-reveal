# Amazing Dev Reveal

A modern developer portfolio website with an AI chatbot assistant.

## Features

- Responsive design
- Dark/light mode support
- AI-powered chatbot using OpenRouter
- Project showcase
- Skills section
- Contact form

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- pnpm (recommended) or npm
- OpenRouter API key (get it from [OpenRouter](https://openrouter.ai/keys))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aIrtaza Portfolio.git
   cd aIrtaza Portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your OpenRouter API key to `.env.local`

### Running Locally

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Chatbot Setup

The chatbot uses OpenRouter to provide AI-powered assistance. To use it:

1. Get an API key from [OpenRouter](https://openrouter.ai/keys)
2. Add it to your `.env.local` file:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```
3. The chatbot will appear in the bottom-right corner of the website

## Building for Production

```bash
pnpm build
# or
npm run build
```

This will create a `dist` folder with the production build.

## Deployment

### Vercel

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Netlify

You can also deploy to Netlify by connecting your GitHub repository.

### Environment Variables

Make sure to set up the following environment variables in your deployment:
- `VITE_OPENROUTER_API_KEY`: Your OpenRouter API key

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [OpenRouter Documentation](https://openrouter.ai/docs)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0b97c633-e4bd-4c56-abc4-8598c34ab3fa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
