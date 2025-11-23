# COI Review Dashboard

A comprehensive Certificate of Insurance (COI) Review Dashboard built with React, TypeScript, and Tailwind CSS. This application allows users to efficiently manage, track, and review certificates of insurance for properties and tenants.

![COI Dashboard](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-blue) ![Vite](https://img.shields.io/badge/Vite-7-blue)

## Features

### Core Functionality
- ✅ **Dashboard Overview**: View all COIs with summary statistics (Total Processed, Accepted, Rejected, Expiring in 30 days)
- ✅ **COI Management**: Create, read, update, and delete COI records
- ✅ **Advanced Filtering**: Filter by properties, status, expiry date range, and search queries
- ✅ **Pagination**: Navigate through large datasets with customizable rows per page (10, 25, 50, 100)
- ✅ **Sorting**: Sort by property, tenant name, expiry date, and status
- ✅ **Status Management**: Update COI status with dropdown (Active, Expired, Rejected, Expiring Soon, Not Processed)
- ✅ **Bulk Operations**: Select multiple COIs and send bulk reminders
- ✅ **Reminder System**: Track and send reminders for expiring COIs

### Bonus Features Implemented
✅ **TypeScript**: Full type safety throughout the application
✅ **Dark Mode**: Toggle between light and dark themes with localStorage persistence
✅ **Search Debounce**: Optimized search with 300ms debounce for better performance
✅ **Column Sorting**: Sort by any column in ascending/descending order
✅ **CSV Export**: Export all COI data to CSV format
✅ **Local Storage**: Persist data across browser sessions
✅ **Responsive Design**: Mobile-friendly layout matching the Figma design
✅ **Form Validation**: Email validation and required field checks
✅ **Context API**: Clean state management with React Context

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS v3 | Styling |
| React Router v6 | Routing |
| Lucide React | Icons |
| date-fns | Date manipulation |
| Context API | State management |

## Project Structure

```
coi-review-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard/        # Dashboard-specific components
│   │   ├── COI/              # COI table and form components
│   │   ├── Layout/           # Sidebar and Header
│   │   └── Shared/           # Reusable components
│   ├── context/              # React Context for state management
│   ├── hooks/                # Custom hooks
│   ├── pages/                # Page components
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── data/                 # Mock data
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd coi-review-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open browser**: Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Dashboard Overview

The dashboard displays four key statistics cards:
- **Total COI Processed**: All COIs in the system
- **Accepted**: COIs with "Active" status
- **Rejected**: COIs with "Rejected" status
- **Expiring in 30 days**: COIs expiring within 30 days

### Adding a New COI

1. Click "+ ADD COI" button
2. Fill required fields:
   - Property name
   - Tenant name
   - Tenant email (with validation)
   - Unit number
   - COI name
   - Expiry date
   - Status
3. Click "Add COI"

### Editing a COI

- Click edit icon next to expiry date
- Or use three-dot menu → "Edit"
- Update fields and save

### Filtering and Searching

- **Properties**: Multi-select filter
- **Status**: Multi-select filter
- **Expiry Range**: 30/60/90 days
- **Search**: Real-time search (debounced)

### Bulk Operations

1. Select COIs with checkboxes
2. Click "Send Bulk Reminder"
3. Reminder status updates automatically

### Export to CSV

Click download icon in filter bar to export all data.

### Dark Mode

Toggle moon/sun icon in header.

## Data Management

### LocalStorage

All data persists in browser localStorage:
- COI records
- Theme preference
- Filter settings

To reset: Clear browser localStorage or delete `coi-dashboard-data` key.

### Mock Data

20 sample COI records are included with various statuses and expiry dates.

## Color Scheme

### Status Colors
| Status | Color |
|--------|-------|
| Active | Blue |
| Expired | Red |
| Rejected | Red |
| Expiring Soon | Orange |
| Not Processed | Gray |

### Reminder Status
| Status | Color |
|--------|-------|
| Not Sent | Gray |
| Sent (30d/15d/7d) | Green |
| N/A | Gray |

## Performance Optimizations

- ⚡ Debounced search (300ms)
- ⚡ Memoized filtering and sorting
- ⚡ Pagination for large datasets
- ⚡ Efficient re-renders with React.memo
- ⚡ Lazy loading of components

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## Code Quality

- TypeScript for type safety
- ESLint configuration
- Component-based architecture
- Clean separation of concerns
- Reusable hooks and utilities

## Assignment Deliverables

| Requirement | Status |
|------------|--------|
| Code structure | ✅ Clean, modular components |
| UI/UX | ✅ Matches Figma design, responsive |
| State management | ✅ Context API implementation |
| Data handling | ✅ Full CRUD operations |
| Routing | ✅ React Router setup |
| Testing ready | ✅ Jest/RTL compatible structure |
| Dark mode | ✅ Implemented |
| TypeScript | ✅ Full coverage |
| Advanced filtering | ✅ Multi-filter support |

## Future Enhancements

- 🔄 Backend API integration
- 📎 File upload for COI documents
- 📧 Email notification system
- 📊 Advanced analytics dashboard
- 🌍 Multi-language support
- 🔐 Role-based access control
- 🔔 Automated expiry notifications
- 📱 Mobile app (React Native)

## Development

### Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run ESLint
```

### Adding New Features

1. Create components in appropriate directory
2. Add types in `types/coi.types.ts`
3. Use Context for state management
4. Follow existing patterns

## Troubleshooting

### Build Errors
- Ensure Node.js 18+
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### Dark Mode Not Working
- Check localStorage
- Verify ThemeContext is wrapped properly

### Data Not Persisting
- Check browser localStorage settings
- Verify localStorage quota

## License

MIT

## Author

Developed as an assignment demonstrating:
- Modern React development
- TypeScript best practices
- State management patterns
- UI/UX implementation
- Code organization
