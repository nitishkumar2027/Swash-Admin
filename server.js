const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mock data for demonstration
const mockData = {
  customers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0124', orders: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0125', orders: 8 }
  ],
  orders: [
    { id: 1, customer: 'John Doe', service: 'Dry Cleaning', status: 'In Progress', date: '2024-01-15' },
    { id: 2, customer: 'Jane Smith', service: 'Laundry', status: 'Completed', date: '2024-01-14' },
    { id: 3, customer: 'Bob Johnson', service: 'Alterations', status: 'Pending', date: '2024-01-16' }
  ],
  valets: [
    { id: 1, name: 'Mike Wilson', route: 'Downtown', status: 'Active', deliveries: 12 },
    { id: 2, name: 'Sarah Davis', route: 'Uptown', status: 'Active', deliveries: 8 },
    { id: 3, name: 'Tom Brown', route: 'Suburbs', status: 'Off Duty', deliveries: 15 }
  ],
  reports: {
    dailyOrders: 45,
    monthlyRevenue: 12500,
    activeCustomers: 234,
    pendingIssues: 3
  }
};

// Helper function to render with layout
function renderWithLayout(res, view, data) {
  const fs = require('fs');
  const path = require('path');
  
  // Read the layout and view files
  const layoutPath = path.join(__dirname, 'views', 'layout.ejs');
  const viewPath = path.join(__dirname, 'views', `${view}.ejs`);
  
  try {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    const viewContent = fs.readFileSync(viewPath, 'utf8');
    
    // Render the view content first
    const renderedView = require('ejs').render(viewContent, data);
    
    // Then render the layout with the view content as body
    const renderedLayout = require('ejs').render(layoutContent, {
      ...data,
      body: renderedView
    });
    
    res.send(renderedLayout);
  } catch (error) {
    console.error('Rendering error:', error);
    res.status(500).send('Error rendering page');
  }
}

// Routes
app.get('/', (req, res) => {
  renderWithLayout(res, 'dashboard', {
    title: 'SWASH Internal Portal',
    user: 'Sai Nitish Kumar Reddy',
    reports: mockData.reports
  });
});

app.get('/customers', (req, res) => {
  renderWithLayout(res, 'customers', {
    title: 'Customers',
    user: 'Sai Nitish Kumar Reddy',
    customers: mockData.customers 
  });
});

app.get('/orders', (req, res) => {
  renderWithLayout(res, 'orders', {
    title: 'Orders',
    user: 'Sai Nitish Kumar Reddy',
    orders: mockData.orders 
  });
});

app.get('/valets', (req, res) => {
  renderWithLayout(res, 'valets', {
    title: 'Valets',
    user: 'Sai Nitish Kumar Reddy',
    valets: mockData.valets 
  });
});

app.get('/reports', (req, res) => {
  renderWithLayout(res, 'reports', {
    title: 'Reports',
    user: 'Sai Nitish Kumar Reddy',
    reports: mockData.reports,
    customers: mockData.customers,
    orders: mockData.orders 
  });
});

// API routes for AJAX requests
app.get('/api/customers', (req, res) => {
  res.json(mockData.customers);
});

app.get('/api/orders', (req, res) => {
  res.json(mockData.orders);
});

app.get('/api/valets', (req, res) => {
  res.json(mockData.valets);
});

app.get('/api/reports', (req, res) => {
  res.json(mockData.reports);
});

// Handle other dashboard sections with placeholder pages
const sections = ['sms', 'receipts', 'issues', 'vendors', 'routes', 'cleaner-tickets', 
                 'work-items', 'garment-finder', 'receive-garments', 'valet-feedback', 
                 'internal-feedback-tools', 'delivery-prep', 'payments', 'dispatch', 
                 'bag-tags', 'racks', 'scans', 'rack-load-out', 'rack-load-in', 
                 'admin', 'email-previews', 'sop-guide', 'hr'];

sections.forEach(section => {
  app.get(`/${section}`, (req, res) => {
    renderWithLayout(res, 'section', {
      title: section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' '),
      user: 'Sai Nitish Kumar Reddy',
      section: section 
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SWASH Admin Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 Access your dashboard at http://localhost:${PORT}`);
  console.log(`🌐 External access: http://0.0.0.0:${PORT}`);
  console.log(`🔗 If in a workspace, check your ports panel for the public URL`);
});