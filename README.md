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
- [ ] clean up import `React.` and standardised naming/import in components
  - [ ] split up filters into seperate folder, remove and use component, input component in price range
- [x ]unit testing ( timebox )
  - [x] cart components
  - [x] product list
  - [ ] filter
- [ ] mobile + ui ( timebox )
- [ ] Image component best practice fix
- [ ] payment gateway
- [ ] need to set up CICD to deploy on vercel on push + tools ( precommit, eslint, coding standard ) for better maintainence ( timebox on tools)
- [ ] animation + clean up CSS classes
- [ ] cart Page - integrate loading state
- [ ] browser compatitablity test
- [ ] api caching and optimisation ( timebox )
- [ ] pagination
- [x] All components, layout and templates to be developed from scratch, not
      allowed to use any off the shelf templates or packages - need to rewrite some ui components ( select dropdown ) if time permits. ( timebox )

## Setup

- create `.env` file with `NEXT_PUBLIC_NEXT_PUBLIC_VERCEL_URL=http://localhost:3000` assuming you're using port 3000
