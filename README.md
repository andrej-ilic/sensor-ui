# Sensor-UI

## How to run

1. Install dependencies with `npm install`
2. Create a new app in Firebase (or pick existing app)
3. Create a `.env` file (`.env.local` or `.env.production.local` and `.env.development.local`)
4. Fill out the `.env` file according to `.env.sample` with your Firebase app's config
5. Run with `npm start`

## Build and deploy to Firebase

1. Using the Firebase CLI switch to your Firebase project with `firebase use <project-id>`
2. Run the deploy script: `npm run deploy`
