## Setup

### local dev

- create `.env.local` file with `NEXT_PUBLIC_VERCEL_URL=localhost:3000`,  `STRIPE_API_KEY=${you key}`, `NEXT_PUBLIC_DUMMYJSON_URL=dummyjson.com`

### prod in vercel

- add env variables `NEXT_PUBLIC_DUMMYJSON_URL=dummyjson.com` and `STRIPE_API_KEY=${you key}`

## notes

- was planning to proxy `dummyjson.com` via `next.config.js` but no luck on vercel
- Left out important stuffs like cicd pipeline on every commit due to time constraints
- will add payment gateway + animation if time permits
- build own backend instead of using dummyjson.
- more...

## todos

### priority in order

- [x] filters
  - [x] categories
  - [x] rating
  - [x] price range
  - [x] dynamic price range filter + star rating ( need to get from products query)
  - [x] filter-reset
  - [ ] loading state for priceRange filter
  - [ ] update priceRange on diff category
- [x] product listing + detail page info display
- [x] checkout + - items features
  - [x] split up filters into seperate folder, remove and use component, input component in price range
- [x]unit testing ( timebox )
  - [x] cart components
  - [x] product list
  - [x] filter
- [x] mobile + ui ( timebox )
- [x] Image component best practice fix
- [x] payment gateway
- [x] need to set up CICD to deploy on vercel on push + tools ( test, precommit checks, coding standard ) for better maintainence ( timebox on tools)
- [ ] animation + clean up CSS classes
- [ ] cart Page - integrate loading state
- [ ] browser compatitablity test
- [ ] api caching and optimisation ( timebox )
- [ ] pagination
- [x] All components, layout and templates to be developed from scratch, not
      allowed to use any off the shelf templates or packages - need to rewrite some ui components ( select dropdown ) if time permits. ( timebox )
