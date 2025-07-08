// Main JavaScript file for Swash Admin Dashboard

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Swash Admin Dashboard loaded successfully!');
    
    // Initialize dashboard features
    initializeNavigation();
    initializeSearch();
    initializeTooltips();
    updateActiveNavLink();
});

// Navigation functionality
function initializeNavigation() {
    // Highlight active navigation item based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="search" i]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            performSearch(searchTerm, e.target);
        });
    });
}

// Perform search on tables
function performSearch(searchTerm, inputElement) {
    const table = inputElement.closest('.container-fluid, .row').querySelector('table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Dashboard tile click tracking
function trackTileClick(tileName) {
    console.log(`🔗 Navigating to: ${tileName}`);
    // Analytics tracking could be implemented here
}

// Add click tracking to all dashboard tiles
document.addEventListener('DOMContentLoaded', function() {
    const tileLinks = document.querySelectorAll('.tile-link');
    tileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const tileName = this.querySelector('span').textContent;
            trackTileClick(tileName);
        });
    });
});

// Utility functions for API calls
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        showNotification('Error: ' + error.message, 'error');
        throw error;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Loading state management
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        const originalText = element.textContent;
        element.dataset.originalText = originalText;
        element.innerHTML = '<span class="loading"></span> Loading...';
    } else {
        element.disabled = false;
        element.textContent = element.dataset.originalText;
    }
}

// Real-time clock for dashboard
function initializeClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const clockElement = document.getElementById('dashboard-clock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInputs = document.querySelectorAll('input[type="text"]');
        searchInputs.forEach(input => {
            input.value = '';
            input.dispatchEvent(new Event('input'));
        });
    }
});

// Auto-refresh data every 30 seconds
function startAutoRefresh() {
    setInterval(async () => {
        try {
            // Only refresh if on dashboard page
            if (window.location.pathname === '/') {
                await refreshDashboardData();
            }
        } catch (error) {
            console.error('Auto-refresh failed:', error);
        }
    }, 30000);
}

// Refresh dashboard data
async function refreshDashboardData() {
    try {
        const reports = await apiCall('/api/reports');
        updateDashboardCards(reports);
    } catch (error) {
        console.error('Failed to refresh dashboard data:', error);
    }
}

// Update dashboard cards with new data
function updateDashboardCards(reports) {
    const cardSelectors = {
        dailyOrders: 'h4:contains("Daily Orders")',
        monthlyRevenue: 'h4:contains("Monthly Revenue")',
        activeCustomers: 'h4:contains("Active Customers")',
        pendingIssues: 'h4:contains("Pending Issues")'
    };
    
    Object.keys(cardSelectors).forEach(key => {
        const element = document.querySelector(cardSelectors[key]);
        if (element && reports[key]) {
            if (key === 'monthlyRevenue') {
                element.textContent = `$${reports[key].toLocaleString()}`;
            } else {
                element.textContent = reports[key];
            }
        }
    });
}

// Initialize auto-refresh on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only start auto-refresh on dashboard
    if (window.location.pathname === '/') {
        startAutoRefresh();
    }
});

// Export functions for global use
window.SwashDashboard = {
    showNotification,
    setLoadingState,
    apiCall,
    trackTileClick
};