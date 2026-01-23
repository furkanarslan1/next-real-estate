🏠 Next Real Estate - Next.js 16 & Supabase
Next Real Estate is a high-performance and scalable real estate listing platform built using modern web technologies. Built on the Next.js 16 (App Router) architecture, the project utilizes PostgreSQL JSONB structures and dynamic filtering algorithms to manage complex real estate data efficiently.

> Next.js 16 · React 19 · Supabase (PostgreSQL + JSONB) · Zod · Tailwind v4 · Programmatic SEO

<img src="/public/screenshots/admin-statistic.webp" width="600" alt="Next Real Estate statistic">
<img src="/public/screenshots/admin-image-upload.webp" width="600" alt="Next Real Estate upload">

📸 Full UI gallery available at the bottom of the page.

🚀 Project Features
🏗 Architecture & Data Structure

Hybrid Database Model: Core data (price, title) is stored in relational columns, while category-specific data (e.g., Zoning Status for Land, Room Count for Residential) is stored in a PostgreSQL JSONB (category_data) column. This allows adding new categories without altering the database schema.

Type-Safe Transformations: Data coming from the API is automatically transformed (string -> number) and validated using Zod.

🔍 Advanced Search & Filtering

Dynamic Filter UI: The interface filters automatically change based on the selected category (Residential, Commercial, Land, Project).

Validated Search: Price ranges entered by users (Min < Max) and data types are validated server-side using Zod schemas.

URL-Based State: All filters are stored in URL parameters, making searches shareable and SEO-friendly.

⚡ Performance & SEO

Server Components & SSR: Property details and listings are rendered server-side (async/await components).

Structured Data (JSON-LD): Product and Offer schemas are dynamically generated for Google Rich Results.

Image Optimization: Pre-upload compression using browser-image-compression and Next.js Image optimization.

🛠️ Tech Stack
This project is built using the latest and most stable technologies:

Area Technology Version / Details
Framework Next.js v16.1.1 (App Router)
Core React v19 (RC)
Database Supabase PostgreSQL + Auth + Storage
Styling Tailwind CSS v4.0 (PostCSS)
UI Kit Shadcn UI Radix Primitives
Validation Zod Schema & Type Inference
Forms React Hook Form Performant form management
Animation Framer Motion Page transitions & micro-interactions
Slider Swiper Mobile-responsive gallery
📂 Data Modeling (Senior Touch)
The project uses the JSONB pattern, a modern interpretation of the EAV (Entity-Attribute-Value) model, to efficiently manage different property types in a single table.

Example Data Structure (properties table):

TypeScript
// Residential Listing
{
id: "uuid...",
category: "residential",
price: 5000000,
category_data: {
room_count: "3+1",
heating: "natural gas",
balconies: "2"
}
}

// Land Listing
{
id: "uuid...",
category: "land",
price: 8000000,
category_data: {
zoning_status: "Residential",
ada: "145",
parsel: "12"
}
}
This structure is strictly controlled and type-checked via Zod definitions in propertySchema.ts.

📦 Installation & Setup
Follow the steps below to run the project in your local environment:

Clone the Repository:

Bash
git clone https://github.com/yourusername/next-real-estate.git
cd next-real-estate
Install Dependencies:

Bash
npm install

# or

pnpm install
Set Environment Variables: Create a .env.local file in the root directory and add your Supabase credentials:

Kod snippet'i
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
Start the Development Server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

🛡️ SEO Strategy
The project employs Programmatic SEO techniques:

Dynamic Metadata: Titles, descriptions, and OpenGraph images for each listing are automatically generated via the generateMetadata function.

Rich Snippets: Structured data in JSON-LD format is provided on property detail pages for Google to parse.

TypeScript
// Example JSON-LD Output
{
"@context": "https://schema.org",
"@type": "Product",
"name": "Luxury 3+1 Apartment for Sale",
"offers": {
"@type": "Offer",
"price": "5000000",
"priceCurrency": "TRY"
}
}
🤝 Contributing
Fork this repository.

Create a new feature branch (git checkout -b feature/new-feature).

Commit your changes (git commit -m 'feat: added new feature').

Push to the branch (git push origin feature/new-feature).

Open a Pull Request.

📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Developer

Furkan Arslan Frontend Developer | Next.js Enthusiast

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/furkan-arslan-w)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/furkanarslan1)

<img src="/public/screenshots/home-hero.webp" width="600" alt="Next Real Estate hero">
<img src="/public/screenshots/about-banner.webp" width="600" alt="Next Real Estate banner">
<img src="/public/screenshots/about-feature.webp" width="600" alt="Next Real Estate feature">

<img src="/public/screenshots/admin-properties.webp" width="600" alt="Next Real Estate properties">
<img src="/public/screenshots/contact.webp" width="600" alt="Next Real Estate contact">
<img src="/public/screenshots/detail-filter.webp" width="600" alt="Next Real Estate filter">
<img src="/public/screenshots/footer.webp" width="600" alt="Next Real Estate footer">
<img src="/public/screenshots/properties-page.webp" width="600" alt="Next Real Estate properties-page">
<img src="/public/screenshots/property-add-form.webp" width="600" alt="Next Real Estate add-form">
<img src="/public/screenshots/property-detail-desc.webp" width="600" alt="Next Real Estate detail-desc">
<img src="/public/screenshots/property-detail-images.webp" width="600" alt="Next Real Estate property-detail-images">
