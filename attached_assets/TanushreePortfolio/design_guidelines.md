# Design Guidelines for Tanushree Bharti Portfolio

## Design Approach: Reference-Based (Creative Portfolio + Academic Excellence)

**Primary Inspiration**: Linear (clean, animated), Notion (content-rich), Dribbble portfolios (visual impact)

**Design Philosophy**: Professional academic portfolio with subtle 2D animations that convey technical expertise and creative capability. Balance scholarly credibility with modern web development prowess.

---

## Typography System

**Font Stack**: 
- Headings: Inter (700, 600, 500) - clean, professional, technical
- Body: Inter (400, 300) - optimal readability
- Accent/Code: JetBrains Mono (500) - for technical details

**Scale**:
- Hero Heading: text-6xl md:text-7xl lg:text-8xl
- Section Headings: text-4xl md:text-5xl
- Subsection Headings: text-2xl md:text-3xl
- Card Titles: text-xl md:text-2xl
- Body: text-base md:text-lg
- Small/Meta: text-sm

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32

**Container Strategy**:
- Page containers: max-w-7xl with px-6 md:px-8
- Content sections: py-20 md:py-32 for generous breathing room
- Cards/Components: p-6 md:p-8

**Grid Patterns**:
- Projects: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-8
- Achievements: grid-cols-1 lg:grid-cols-2 with gap-12
- Blog: Single column max-w-4xl for readability

---

## Component Library

### Navigation
- Fixed header with backdrop-blur-lg, border-b with subtle shadow
- Logo left, navigation center/right
- Smooth scroll to sections with active state indicators
- Mobile: Slide-in drawer with staggered menu items animation

### Hero Section (Home)
- Full-width hero (min-h-screen) with large professional photo or abstract gradient background
- Animated typing effect for name/title
- Floating particle animation (subtle dots/shapes using CSS/Framer Motion)
- Large prominent CTA buttons with backdrop-blur effect if over image
- Social links (LinkedIn, Email) with hover scale animation

### About Section
- Two-column layout: photo left, bio/stats right (stacks on mobile)
- Animated counter for stats (1.5 years experience, 4+ publications, 25+ projects guided)
- Timeline component showing career progression with animated reveal on scroll

### Project Cards
- Elevated cards with subtle hover lift (scale-105, shadow increase)
- Category badge (IoT, AI, Web Dev, Game)
- Tech stack tags with icon library (Heroicons)
- Staggered entrance animation on scroll
- Filter buttons at top with smooth transition between categories

### Achievement Cards
- Timeline layout for chronological items
- Icon-based categories (certificate, publication, patent, book)
- Expandable details on click with smooth accordion animation
- Publication cards show journal name, date, DOI-style formatting

### Blog Components
- Card grid for listings with featured image, title, excerpt, date, read time
- Individual post: max-w-prose with generous line-height (1.75)
- Table of contents sidebar (sticky on desktop)
- Animated page transitions between blog list and individual posts

### Admin Panel
- Clean dashboard layout with sidebar navigation
- Rich text editor with formatting toolbar
- Post management table with action buttons
- Form inputs with subtle focus animations

### Footer
- Three-column layout: Quick links, Contact info, Newsletter signup
- Social media icons with pulse animation on hover
- Vertical dividers between sections

---

## Animation Strategy (Framer Motion)

**Entrance Animations**: 
- Fade up (translateY: 20 to 0, opacity: 0 to 1)
- Stagger children with 0.1s delay
- Trigger on scroll using IntersectionObserver

**Micro-interactions**:
- Button hover: subtle scale (1.02) and shadow increase
- Card hover: lift effect (translateY: -4px)
- Link underline slide-in effect

**Page Transitions**:
- Fade between routes (duration: 0.3s)
- Blog post: slide-in from right

**Avoid**: Heavy animations, parallax scrolling, rotating elements

---

## Page-Specific Layouts

### Home Page Sections (Vertical Flow)
1. Hero (full viewport)
2. About/Bio (2-column with stats)
3. Featured Work (3 project cards)
4. Recent Publications (horizontal scroll cards)
5. CTA Section ("View All Projects" / "Read Blog")
6. Contact Form + Footer

### Achievements Page
- Page header with filter/search
- Tabbed interface: All, Certifications, Publications, Patents, FDPs
- Timeline view (left line, right content cards)
- Animated progress indicators for skill levels

### Projects Page
- Filter bar with category buttons (All, IoT, AI, Web, Games)
- Masonry or equal-height grid
- Quick view modal on card click (image, description, tech stack, role)
- "View Details" expands to full project page

### Blog Page
- Featured post (large card at top)
- Grid of recent posts (2-col on desktop)
- Pagination or infinite scroll
- Search functionality with animated results

### Admin Panel
- Dashboard with post count stats
- Create/Edit post form with live preview
- Post list table with edit/delete actions
- Image upload with drag-drop zone

---

## Images Section

**Large Hero Image**: Yes
- Location: Home page hero section, full-width background
- Description: Professional portrait of Tanushree or abstract tech-themed gradient (neural network visualization, code patterns, or geometric shapes)
- Treatment: Subtle overlay gradient to ensure text readability

**Additional Images**:
- About section: Professional headshot (rounded, medium size)
- Project cards: Placeholder thumbnails showing project type (IoT device, web interface, game screenshot)
- Blog posts: Featured images for each article (16:9 aspect ratio)
- Achievement icons: Certificate, publication, patent symbols from Heroicons

**Image Implementation**:
- Hero: Cover background with fixed attachment for depth
- Cards: Aspect ratio maintained with object-cover
- All images: Lazy loading with fade-in animation

---

## Icon Library

**Selected Library**: Heroicons (via CDN)
- Academic: AcademicCapIcon
- Code: CodeBracketIcon  
- Certificate: ShieldCheckIcon
- Publication: DocumentTextIcon
- Project: BeakerIcon, CpuChipIcon
- Contact: EnvelopeIcon, LinkIcon
- Admin: PencilSquareIcon, TrashIcon, PlusCircleIcon

---

## Accessibility & Interactions

- Focus states: 2px outline with offset, visible for keyboard navigation
- Skip to content link
- ARIA labels for icon-only buttons
- Form validation with clear error messages
- Minimum touch target: 44x44px on mobile
- Reduced motion support: disable animations when prefers-reduced-motion is active

---

**Overall Aesthetic**: Modern, professional, technically sophisticated. Clean lines, generous whitespace, purposeful animations that enhance rather than distract. The design should communicate both academic rigor and web development expertise, positioning Tanushree as a contemporary educator and researcher with strong technical skills.