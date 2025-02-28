# Mindful Performance Frontend

A web application that connects athletes with mental performance coaches to improve their athletic performance through mental coaching.

## Overview

Mindful Performance is a platform that facilitates connections between athletes and mental performance coaches. The application provides a user-friendly interface for athletes to find and book sessions with coaches who can help them improve their mental approach to sports and competition.

## Features

- **User Authentication**: Separate login and signup flows for athletes and coaches
- **Profile Management**: Complete profiles with personal information and preferences
- **Coach Discovery**: Athletes can browse through coaches and find the right match
- **Session Booking**: Integrated scheduling system for booking coaching sessions
- **Availability Management**: Coaches can set and manage their availability
- **Video Conferencing**: Integration with Zoom for virtual coaching sessions
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: React.js
- **Routing**: React Router
- **Styling**: CSS Modules and standard CSS
- **Icons**: Lucide React
- **HTTP Requests**: Axios
- **Date Handling**: date-fns
- **Calendar**: react-calendar, react-datepicker
- **Video Integration**: Agora SDK

## Project Structure

```
mp-profiles/
├── public/                # Static assets
│   ├── favicon.ico
│   ├── icon.png
│   ├── landing.jpg
│   └── ...
├── src/
│   ├── assets/            # Application assets
│   │   ├── haik.jpeg
│   │   ├── landing.jpg
│   │   └── logo.png
│   ├── components/        # React components
│   │   ├── AthleteLoginPage.js
│   │   ├── CoachLoginPage.js
│   │   ├── BookingPage.js
│   │   ├── CoachProfilePage.js
│   │   ├── StudentProfilePage.js
│   │   └── ...
│   ├── config.js          # Configuration settings
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point
│   └── utils.js           # Utility functions
├── .env                   # Environment variables for Zoom integration
├── .env.development       # Development environment variables
├── .env.production        # Production environment variables
└── package.json           # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mp-profiles.git
   cd mp-profiles
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create `.env.development.local` file based on `.env.development`
   - Set the `REACT_APP_API_URL` to your backend API endpoint

### Running the Development Server

```bash
npm start
# or
yarn start
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

## User Flows

### Athlete Flow
1. Athlete signs up or logs in
2. Completes profile questionnaire
3. Browses available coaches
4. Books a session with a coach
5. Joins video call when session time arrives

### Coach Flow
1. Coach signs up or logs in
2. Completes profile questionnaire
3. Sets availability
4. Views booked sessions
5. Joins video call for scheduled sessions

## API Integration

The frontend communicates with the backend API to:
- Save and retrieve user profiles
- Fetch coach listings
- Manage bookings and schedules
- Handle authentication

The API endpoints are defined in `src/components/api.js`.

## Zoom Integration

The application integrates with Zoom for video conferencing. Zoom API keys are stored in environment variables.

## Deployment

The application can be deployed using any static site hosting service:

1. Build the production-ready bundle:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the contents of the `build` folder to your hosting provider.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the Mindful Performance team.
