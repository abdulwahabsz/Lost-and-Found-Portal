import React, { useState, useEffect } from 'react';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPhone 13",
      category: "Electronics",
      status: "Lost",
      location: "Library - 2nd Floor",
      date: "2024-06-10",
      description: "Black iPhone 13 with cracked screen protector",
      contact: "wahab@email.com"
    },
    {
      id: 2,
      name: "Blue Backpack",
      category: "Bags",
      status: "Found",
      location: "Cafeteria",
      date: "2024-06-12",
      description: "Blue Jansport backpack with math textbooks",
      contact: "admin123@school.edu"
    },
    {
      id: 3,
      name: "Car Keys",
      category: "Keys",
      status: "Lost",
      location: "Parking Lot A",
      date: "2024-06-13",
      description: "Toyota keys with red keychain",
      contact: "rajawahab@gmail.com"
    }
  ]);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    status: 'Lost',
    location: '',
    description: '',
    contact: ''
  });

  const categories = ['All', 'Electronics', 'Bags', 'Keys', 'Clothing', 'Books', 'Jewelry', 'Other'];
  const statuses = ['All', 'Lost', 'Found', 'Returned'];

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = items;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, statusFilter, categoryFilter]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.category && newItem.location && newItem.contact) {
      const item = {
        id: Date.now(),
        ...newItem,
        date: new Date().toISOString().split('T')[0]
      };
      setItems([...items, item]);
      setNewItem({
        name: '',
        category: '',
        status: 'Lost',
        location: '',
        description: '',
        contact: ''
      });
      setShowAddForm(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="itemlist-container">
      <div className="header">
        <h1>Lost & Found Portal</h1>
        <p>Manage and track lost and found items</p>
      </div>

      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search items, descriptions, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-form-container">
          <form onSubmit={handleAddItem} className="add-form">
            <h3>Add New Item</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                required
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <select
                value={newItem.status}
                onChange={(e) => setNewItem({...newItem, status: e.target.value})}
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newItem.location}
                onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              className="full-width"
            />
            <input
              type="email"
              placeholder="Contact Email"
              value={newItem.contact}
              onChange={(e) => setNewItem({...newItem, contact: e.target.value})}
              className="full-width"
              required
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Item</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="stats">
        <div className="stat-card">
          <span className="stat-number">{filteredItems.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredItems.filter(item => item.status === 'Lost').length}</span>
          <span className="stat-label">Lost Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredItems.filter(item => item.status === 'Found').length}</span>
          <span className="stat-label">Found Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredItems.filter(item => item.status === 'Returned').length}</span>
          <span className="stat-label">Returned</span>
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <h3>No items found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className={`item-card ${item.status.toLowerCase()}`}>
              <div className="item-header">
                <h3>{item.name}</h3>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="item-details">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Contact:</strong> {item.contact}</p>
              </div>
              <div className="item-actions">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="status-select"
                >
                  {statuses.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemList;