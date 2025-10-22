import React, { useState, useEffect } from 'react';
import SchemeCard from '../components/SchemeCard';
import { apiService } from '../services/api';
import { Filter, Search } from 'lucide-react';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    page: 1
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSchemes();
    fetchCategories();
  }, [filters]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSchemes(filters);
      setSchemes(data.schemes);
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const filteredSchemes = schemes.filter(scheme =>
    scheme.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.benefit_summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Browse All Government Schemes
          </h1>
          <p className="text-gray-600">
            Explore all available government schemes with detailed information and eligibility criteria.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>

            {/* Region Filter */}
            <input
              type="text"
              placeholder="Filter by region..."
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="input-field"
            />

            {/* Clear Filters */}
            <button
              onClick={() => {
                setFilters({ category: '', region: '', page: 1 });
                setSearchTerm('');
              }}
              className="btn-secondary"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredSchemes.length} schemes
              </p>
            </div>

            {filteredSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No schemes found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Schemes;