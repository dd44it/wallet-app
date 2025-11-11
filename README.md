# Wallet App

A modern mobile-first wallet application built with React, TypeScript, and Vite. This app displays card balance, daily points, transaction history, and detailed transaction information with an iOS-inspired design.

## 🚀 Features

### Transaction List Screen
- **Card Balance Block**
  - Maximum card limit: $1,500
  - Random card balance generation
  - Available balance calculation (limit - balance)
  
- **Daily Points Block**
  - Calculated based on current day of the season
  - Points formula: Day 1 = 2, Day 2 = 3, Day 3+ = 100% of day-2 + 60% of day-1
  - Displays in "K" format for values ≥ 1000
  
- **No Payment Due Block**
  - Shows "You're paid your balance" message
  
- **Latest Transactions Block**
  - Displays 10 most recent transactions
  - Transaction properties:
    - Type: Payment (with +) or Credit (with -)
    - Amount
    - Transaction name (e.g., IKEA, Rozetka)
    - Transaction description
    - Date: Day name for last 7 days, date for older entries
    - Pending badge when applicable
    - Authorized user name when present
    - Icons with dark background

### Transaction Detail Screen
- Transaction number
- Amount with color coding (green for payments, red for credits)
- Transaction name
- Date and time
- Card information:
  - Status (Approved/Declined)
  - Bank name
  - Card number
  - Total amount
- Transaction description
- Back navigation

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Navigation
- **FontAwesome** - Icons
- **CSS3** - Styling with iOS-inspired design

## 📁 Project Structure

```
wallet-app/
├── src/
│   ├── components/
│   │   ├── TransactionList.tsx      # Main transaction list screen
│   │   ├── TransactionList.css      # Transaction list styles
│   │   ├── TransactionDetail.tsx    # Transaction detail screen
│   │   └── TransactionDetail.css    # Transaction detail styles
│   ├── data/
│   │   └── transactions.json        # Test transaction data
│   ├── utils/
│   │   ├── dailyPoints.ts           # Daily points calculation
│   │   ├── dateUtils.ts             # Date formatting utilities
│   │   └── iconMapper.ts            # Icon mapping for transactions
│   ├── types.ts                     # TypeScript type definitions
│   ├── App.tsx                      # Main app component with routing
│   ├── App.css                      # App-level styles
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite configuration
```

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd wallet-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Getting Started

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Build the app for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## 📱 Layout

The app is designed for **mobile devices only** with a responsive layout:

- **Left Column**: Card Balance Block and Daily Points Block
- **Right Column**: No Payment Due Block
- **Below**: Latest Transactions Block (full width)

On smaller screens (< 480px), the layout stacks vertically.

## 🎨 Design

The app features an **iOS-inspired design** with:
- Light gray background (`#f2f2f7`)
- White cards with subtle shadows
- iOS system colors:
  - Blue: `#007AFF`
  - Green: `#34c759`
  - Red: `#ff3b30`
- Rounded corners and clean typography

## 📊 Daily Points Calculation

The daily points are calculated based on the current day of the season:

- **Seasons**:
  - Spring: March 1 - May 31
  - Summer: June 1 - August 31
  - Autumn: September 1 - November 30
  - Winter: December 1 - February 28/29

- **Formula**:
  - Day 1: 2 points
  - Day 2: 3 points
  - Day 3-30: 100% of day-2 points + 60% of day-1 points (exponential growth)
  - Day 31+: Linear growth (10,600 points per day) to prevent exponential explosion

- **Formatting**: Values ≥ 1000 are displayed in "K" format (e.g., 456K)

## 📝 Data

Transaction data is stored in `src/data/transactions.json`. Each transaction includes:
- `id`: Unique identifier
- `type`: "Payment" or "Credit"
- `amount`: Transaction amount
- `name`: Merchant/transaction name
- `description`: Transaction description
- `date`: ISO date string
- `pending`: Boolean (optional)
- `authorizedUser`: User name (optional)
- `status`: "Approved" or "Declined"
- `bank`: Bank name
- `cardNumber`: Masked card number

## 🔄 Navigation

- Click on any transaction in the list to view its details
- Use the back button in the detail view to return to the transaction list

## 🧪 Testing

The app uses test data from `src/data/transactions.json`. To modify the data:
1. Edit the JSON file
2. The changes will be reflected immediately in development mode

## 📄 License

This project is private and for educational purposes.

## 👨‍💻 Development

### Key Files

- **TransactionList.tsx**: Main screen with card balance, daily points, and transaction list
- **TransactionDetail.tsx**: Detailed transaction view
- **dailyPoints.ts**: Season-based points calculation logic
- **dateUtils.ts**: Date formatting for transactions
- **iconMapper.ts**: Icon assignment for transaction types

### Adding New Transactions

Edit `src/data/transactions.json` and add new transaction objects following the existing structure.

### Modifying Styles

- Transaction List styles: `src/components/TransactionList.css`
- Transaction Detail styles: `src/components/TransactionDetail.css`
- Global styles: `src/index.css`

## 🚀 Deployment to GitHub Pages

The project includes GitHub Actions workflow for automatic deployment to GitHub Pages.

### Quick Setup

1. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the sidebar
   - Under "Source", select **"GitHub Actions"**

2. **Configure Base Path** (if needed):
   - **Root repository** (`username.github.io`): No changes needed (uses `/`)
   - **Subdirectory** (`username.github.io/wallet-app`): 
     - Edit `.github/workflows/deploy.yml`
     - Change `VITE_BASE_PATH: /` to `VITE_BASE_PATH: /wallet-app/`

3. **Deploy**:
   - Push code to `main` or `master` branch
   - GitHub Actions will automatically build and deploy
   - Monitor progress in the **Actions** tab

4. **Access Your App**:
   - Root: `https://username.github.io/`
   - Subdirectory: `https://username.github.io/wallet-app/`

### Files Created for Deployment

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `.nojekyll` - Prevents Jekyll processing
- `404.html` - Auto-created for React Router support

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions, troubleshooting, and custom domain setup.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Build Errors
Ensure all dependencies are installed:
```bash
npm install
```

### TypeScript Errors
Check `tsconfig.json` configuration and ensure all types are properly defined.

### GitHub Pages Deployment Issues
- Ensure GitHub Actions is enabled in repository settings
- Check that "Pages" source is set to "GitHub Actions"
- Verify the base path matches your repository structure
- Check GitHub Actions logs for build errors

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [FontAwesome Documentation](https://fontawesome.com/)

---

Built with ❤️ using React, TypeScript, and Vite
