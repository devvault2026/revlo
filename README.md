# Revlo Agency - Elite Brand Scale System

A stunning, production-ready React website for Revlo Agency featuring a modern light theme with vibrant red, blue, and purple color palette.

## 🚀 Features

- **Modern React + TypeScript** - Type-safe, component-based architecture
- **Stunning UI/UX** - Light theme with vibrant red/blue/purple gradients
- **Framer Motion Animations** - Smooth, professional animations throughout
- **TailwindCSS** - Utility-first styling with custom design tokens
- **Supabase Integration** - Backend ready for leads, team, and services
- **React Router** - Multi-page navigation
- **Form Validation** - React Hook Form with validation
- **State Management** - Zustand for global state
- **Responsive Design** - Mobile-first, works on all devices
- **Performance Optimized** - Fast loading and smooth interactions

## 📁 Project Structure

```
revlo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Team.tsx
│   │   ├── RevloOS.tsx
│   │   ├── Results.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AdminPage.tsx
│   │   └── DashboardPage.tsx
│   ├── lib/                # Utilities and configs
│   │   └── supabase.ts     # Supabase client
│   ├── store/              # State management
│   │   └── appStore.ts     # Zustand store
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env.local              # Environment variables
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Update `.env.local` with your credentials:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_VAPI_PUBLIC_KEY=your_vapi_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🗄️ Supabase Setup

Create these tables in your Supabase project:

### Leads Table
```sql
create table leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  company text,
  phone text,
  revenue_range text,
  message text,
  status text default 'new',
  source text default 'website'
);
```

### Team Members Table
```sql
create table team_members (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  name text not null,
  role text not null,
  bio text,
  expertise text[],
  avatar_url text
);
```

### Services Table
```sql
create table services (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  title text not null,
  description text,
  features text[],
  icon text,
  category text
);
```

## 🎨 Color Palette

- **Purple**: `#8B5CF6` - Primary purple for brand identity
- **Red**: `#EF4444` - Accent red for CTAs and highlights
- **Blue**: `#3B82F6` - Accent blue for trust elements
- **Gradients**: Multi-color gradients combining all three colors

## 📱 Pages

- **Home** (`/`) - Main landing page with all sections
- **Admin** (`/admin`) - Admin dashboard (placeholder)
- **Dashboard** (`/dashboard`) - Client dashboard (placeholder)

## 🔧 Key Technologies

- **React 19** - Latest React features
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Supabase** - Backend as a service
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Hook Form** - Form handling

## 🚀 Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

## 📝 To-Do

- [ ] Set up Supabase database
- [ ] Configure environment variables
- [ ] Implement admin dashboard
- [ ] Add authentication
- [ ] Create API integrations
- [ ] Add blog/content section
- [ ] Implement analytics

## 💡 Development Tips

- Use keyboard shortcuts: 
  - `C` - Scroll to contact
  - `R` - Scroll to Revlo OS  
  - `T` - Back to top
- All animations are optimized for performance
- Forms integrate with Supabase automatically
- Responsive breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)

## 📄 License

Proprietary - Revlo Agency © 2026

---

Built with ❤️ by the Revlo team
