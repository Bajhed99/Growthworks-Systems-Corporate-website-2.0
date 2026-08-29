# Assets Guide

Add your image files to the folders below. These folders are referenced in the GWS Homepage.

## Folder Structure

```
client/public/assets/
├── images/
│   ├── branding/          # Logo and founder portraits
│   │   ├── growthworks-official-logo.png       (Logo - recommended: 200x200px)
│   │   └── clayton-tidwell.webp                (Founder portrait - recommended: 400x500px)
│   │
│   └── industries/        # Industry showcase cards
│       ├── home-services.webp                  (Home Services - recommended: 400x300px)
│       ├── financial-advisors.jpg              (Financial Advisors - recommended: 400x300px)
│       └── insurance-agencies.jpg              (Insurance Agencies - recommended: 400x300px)
```

## How to Add Images

1. **Place image files** in the appropriate folders above
2. **Use standard naming** as shown (underscores, lowercase, include extension)
3. **Image formats**: `.webp` (preferred), `.jpg`, or `.png`
4. **Recommended sizes**:
   - Logo: 200x200px or larger (will be scaled)
   - Founder portrait: 400x500px
   - Industry cards: 400x300px

## Reference

The following files reference these assets:

- `client/src/pages/Home.tsx` — Updates upcoming to point to `/assets/images/`
- Industry cards use: `/assets/images/industries/`
- Branding assets use: `/assets/images/branding/`

Once you add images, the site will automatically display them.

**Full path on your computer:**
`C:\Users\sjhed\OneDrive\Desktop\GWS Website 2.0\client\public\assets\`
