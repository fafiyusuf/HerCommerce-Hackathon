# SergHub - Wedding Planning Platform

A modern wedding planning platform connecting couples with verified local vendors in Ethiopia.

## Features

- **Vendor Discovery**: Browse and search verified vendors across multiple categories
- **Advanced Filtering**: Filter vendors by category, rating, and price range
- **Vendor Profiles**: Detailed vendor profiles with portfolios, services, and reviews
- **User Authentication**: Secure login and signup for couples and vendors
- **Booking System**: Easy booking requests with event details and budget information
- **Dashboard**: Personalized dashboards for couples and vendors
- **Testimonials**: Real success stories from couples and vendors
- **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS v4, custom design tokens
- **Authentication**: Client-side auth with localStorage (demo)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/serghub.git
cd serghub
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

### For Couples:
- Email: `couple@example.com`
- Password: `password123`

### For Vendors:
- Email: `vendor@example.com`
- Password: `password123`

## Project Structure

\`\`\`
serghub/
├── app/
│   ├── layout.tsx           # Root layout with auth provider
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # User dashboard
│   ├── categories/          # Vendor categories
│   ├── search/              # Search and filter page
│   ├── vendors/             # Vendor profiles
│   ├── testimonials/        # Testimonials page
│   ├── not-found.tsx        # 404 page
│   └── error.tsx            # Error page
├── components/
│   ├── navigation.tsx       # Main navigation
│   ├── vendor-card.tsx      # Vendor card component
│   ├── featured-vendor-card.tsx
│   ├── category-card.tsx
│   ├── testimonial-card.tsx
│   └── booking-modal.tsx    # Booking form modal
├── lib/
│   ├── data.ts              # Mock vendor data
│   ├── testimonials.ts      # Testimonial data
│   └── auth-context.tsx     # Authentication context
├── public/
│   ├── images/              # Vendor images
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO robots file
│   └── sitemap.xml          # XML sitemap
└── README.md
\`\`\`

## Key Pages

- **Home** (`/`): Landing page with featured vendors and testimonials
- **Categories** (`/categories`): Browse vendors by category
- **Search** (`/search`): Advanced search and filtering
- **Vendor Profile** (`/vendors/[id]`): Detailed vendor information
- **Testimonials** (`/testimonials`): Success stories
- **Dashboard** (`/dashboard`): User dashboard
- **Bookings** (`/dashboard/bookings`): Manage bookings
- **Login** (`/login`): User authentication
- **Signup** (`/signup`): Create new account

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

The app will be automatically deployed and updated on every push to main.

### Environment Variables

For production deployment, add these environment variables in Vercel:

\`\`\`
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Features for Future Enhancement

- Real database integration (Supabase, Neon)
- Payment processing (Stripe)
- Email notifications
- Vendor verification system
- Advanced analytics
- Mobile app
- Multi-language support
- Video testimonials
- Vendor ratings and reviews system
- Calendar integration
- Budget planning tools

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS with Tailwind CSS
- SEO optimization with metadata
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email support@serghub.et or open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for Ethiopian weddings
