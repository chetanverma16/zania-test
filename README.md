This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Run npm install

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Deployed [here](https://zania-test-chetan.vercel.app/)

## Part 1: Frontend

### Frontend Implementation

Built a drag-and-drop card grid using dndkit library. Each card shows a document with its thumbnail. Added loading spinners while images load. Click any card to view the full image in an overlay (press ESC to close).

## Part 2: Backend

### Backend Implementation

Implemented a simple backend using Prisma ORM with PostgreSQL database. While the original task suggested using Starlette (Python), I chose a Node.js-based stack to better align with my frontend expertise. The backend handles basic CRUD operations for managing document metadata and image references.

## Part 3: Tying It Up

Implemented the backend and frontend together, in which we are saving the data every 5 seconds.

## Part 4: Deployment

Created a docker compose file and also deployed it on vercel.

## Part 5: Improvements

- Added a CREATE (api/card) endpoint to add a new card to the grid.
- Added a DELETE (api/card) endpoint to delete a card from the grid.
