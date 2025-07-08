# SWASH Admin Dashboard

A modern, fully functional web-based admin dashboard for SWASH - a laundry and dry cleaning service management system.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design using Bootstrap 5 and custom CSS
- **Dashboard Overview**: Real-time statistics and metrics
- **Customer Management**: View, search, and manage customer information
- **Order Tracking**: Track orders with different statuses and services
- **Valet Management**: Manage delivery valets with route assignments
- **Analytics & Reports**: Interactive charts and data visualization
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Auto-refreshing data every 30 seconds
- **Search Functionality**: Global search across all data tables
- **Navigation**: Sidebar navigation with active page highlighting

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Frontend**: Bootstrap 5, Font Awesome icons, Chart.js
- **Styling**: Custom CSS with modern design patterns
- **JavaScript**: Vanilla JS with modern ES6+ features

## 📋 Dashboard Sections

The dashboard includes access to all major business functions:

- **Customers**: Customer database management
- **Orders**: Order processing and tracking
- **Valets**: Delivery personnel management
- **SMS**: Communication system
- **Receipts**: Receipt management
- **Issues**: Problem tracking and resolution
- **Vendors**: Vendor relationship management
- **Routes**: Delivery route optimization
- **Reports**: Business analytics and reporting
- **And many more...**

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd /workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the dashboard**
   ```
   Open your browser and navigate to: http://localhost:3000
   ```

### Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

## 📁 Project Structure

```
swash-admin-dashboard/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates
│   ├── layout.ejs        # Main layout template
│   ├── dashboard.ejs     # Dashboard home page
│   ├── customers.ejs     # Customer management
│   ├── orders.ejs        # Order management
│   ├── valets.ejs        # Valet management
│   ├── reports.ejs       # Analytics & reports
│   └── section.ejs       # Generic section template
├── public/               # Static assets
│   ├── css/
│   │   └── main.css      # Custom styles
│   └── js/
│       └── main.js       # Frontend JavaScript
└── README.md            # This file
```

## 🔧 Configuration

### Port Configuration

The server runs on port 3000 by default. You can change this by setting the PORT environment variable:

```bash
PORT=8080 npm start
```

### Mock Data

The application currently uses mock data for demonstration. In a production environment, you would:

1. Connect to a real database (MongoDB, PostgreSQL, etc.)
2. Replace mock data with actual database queries
3. Add authentication and authorization
4. Implement real-time notifications

## 🎨 UI Features

- **Responsive Grid Layout**: Dashboard tiles adapt to screen size
- **Interactive Elements**: Hover effects and smooth transitions
- **Status Indicators**: Color-coded badges for different states
- **Search & Filter**: Real-time search across data tables
- **Charts & Graphs**: Interactive data visualization
- **Loading States**: Visual feedback for async operations
- **Notifications**: Toast notifications for user feedback

## 🔐 Security Considerations

For production deployment, consider implementing:

- User authentication and authorization
- HTTPS/SSL certificates
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Environment variable management
- Database security

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Check the console for error messages
- Ensure all dependencies are installed
- Verify Node.js version compatibility
- Check that port 3000 is available

## 🔄 Future Enhancements

- Real database integration
- User authentication system
- Real-time notifications with WebSockets
- Advanced reporting and analytics
- Mobile app companion
- API documentation
- Automated testing
- Docker containerization

---

**Built with ❤️ for SWASH Internal Operations**
