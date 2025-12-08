# Good Burger 🍔

A simple online burger shop built with Next.js. Browse the menu, add items to your cart, and place orders with automatic discount calculations.

## Technologies and Frameworks

This project is built with:

- **Next.js 16** - React framework for the frontend
- **React 19** - UI library
- **Tailwind CSS 4** - For styling (using the new PostCSS setup)
- **Jest** - Testing framework for unit tests (currently only testing pure functions)

The app uses Next.js App Router and is fully client-side rendered. All the menu data comes from a local JSON file, and the discount logic is implemented as a pure function that's easy to test.

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 18 or higher should work fine).

### Installation

First, install the dependencies:

```bash
npm install
```

### Running the Development Server

Start the dev server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload when you make changes to the code.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `.next` folder. To run the production server locally:

```bash
npm start
```

### Running Tests

The project includes unit tests for the discount calculation logic. To run them:

```bash
npm test
```

For watch mode (tests re-run automatically on file changes):

```bash
npm run test:watch
```

The tests cover the discount scenarios:
- 20% discount when you have 1 sandwich + 2 extras
- 15% discount for 1 sandwich + 1 extra
- 10% discount for 2 extras (no sandwich)
- No discount for other combinations

## Known Limitations and Assumptions

A few things to keep in mind:

**Data Persistence:**
- Orders are stored only in memory (component state). They'll disappear if you refresh the page. This was intentional for this demo - in a real app you'd want a backend API to persist orders.

**Menu Data:**
- The menu items are loaded from a static JSON file (`public/data/menuItems.json`). There's a 1-second delay built in to simulate an API call, but it's just reading from a local file.

**Cart Restrictions:**
- You can only add one sandwich per order
- You can only add one of each extra item (Fries, Soft Drink, etc.) per order
- These restrictions are enforced in the UI, but there's no backend validation

**Images:**
- Product images are loaded from external URLs (Freepik). If those URLs go down, the images won't load. In production you'd want to host these yourself.

**Discount Logic:**
- Discounts are calculated based on specific combinations. The highest applicable discount is applied (20% > 15% > 10% > 0%)
- Only one discount can be applied at a time, even if multiple rules could match

**No Backend:**
- This is a frontend-only demo. There's no user authentication, payment processing, or order management system. It's just the UI and client-side logic.

## Project Structure

The main code is in `src/app/`:
- `page.jsx` - Main page component
- `components/` - Reusable React components
- `utils/` - Utility functions (like the discount calculator)
- `services/` - API/service layer (currently just reads from JSON)
- `utils/__tests__/` - Unit tests

## Learn More

To learn more about Next.js, check out:
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
