# COI Review Dashboard

A modern dashboard for managing Certificate of Insurance (COI) records for properties and tenants. Built with React, TypeScript, and Tailwind CSS.

## Overview

This application helps property managers track and manage insurance certificates across multiple properties. It includes features like filtering, sorting, bulk operations, and reminders for expiring certificates.

## Key Features

**Dashboard & Statistics**
- Quick overview with stats cards showing total processed, accepted, rejected, and expiring certificates
- Real-time updates as you manage records

**COI Management**
- Add, edit, and delete certificate records
- Update status directly from the table
- Track reminder history for each certificate

**Search & Filter**
- Search across tenant names, properties, and units
- Filter by multiple properties and statuses at once
- Filter by expiry date ranges (30/60/90 days)

**Data Operations**
- Bulk reminder system for selected certificates
- Export all data to CSV
- Sort by any column

**User Experience**
- Dark mode support
- Responsive design that works on all screen sizes
- Data persists in browser localStorage
- Fixed layout with scrollable table content

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v3
- React Router v6
- date-fns
- Lucide React (icons)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Akshat53/coi-review-dashboard.git
cd coi-review-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── COI/              # COI table and form components
│   ├── Dashboard/        # Dashboard components (stats, filters, pagination)
│   ├── Layout/           # Sidebar and header
│   └── Shared/           # Reusable components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── pages/                # Page components
├── types/                # TypeScript interfaces
├── utils/                # Helper functions
└── data/                 # Mock data
```

## How to Use

### Adding a Certificate

1. Click the "+ ADD COI" button
2. Fill in the property details, tenant information, and expiry date
3. Select a status and save

### Editing

- Click the edit icon next to the expiry date, or
- Use the three-dot menu and select "Edit"

### Filtering

Use the dropdowns at the top to filter by:
- Properties (multi-select)
- Status (multi-select)
- Expiry date range

The search bar filters across tenant names, properties, and units in real-time.

### Bulk Reminders

1. Check the boxes next to certificates you want to remind
2. Click "Send Bulk Reminder"
3. Reminder status updates automatically

### Exporting Data

Click the download icon in the filter bar to export all COI data to CSV.

## Data Persistence

All data is stored in browser localStorage, so it persists between sessions. This includes:
- COI records
- Dark mode preference
- Filter selections

To reset everything, clear your browser's localStorage for this site.

## Status Colors

- **Active**: Blue
- **Expired**: Red
- **Rejected**: Red
- **Expiring Soon**: Orange
- **Not Processed**: Gray

## Browser Support

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Code Organization

The codebase follows a component-based architecture with:
- Separation of concerns (UI, logic, state)
- TypeScript for type safety
- Custom hooks for reusable logic
- Context API for global state

## Performance

- Search is debounced (300ms) to reduce re-renders
- Large lists are paginated
- Operations are memoized where beneficial
- Components use React.memo where appropriate

## Future Ideas

Some features that could be added:
- Backend API integration
- File upload for COI documents
- Email notification system
- Advanced analytics
- Role-based access control
- Automated expiry notifications

## License

MIT

## Author

Built to demonstrate modern React development practices, including TypeScript, state management, and UI/UX implementation.
