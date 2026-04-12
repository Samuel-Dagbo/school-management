import { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Square,
  CheckSquare,
  ArrowUpRightFromSquare
} from 'lucide-react';
import clsx from 'clsx';
import EmptyState from './EmptyState';

export default function DataTable({
  data = [],
  columns = [],
  loading = false,
  searchable = true,
  searchPlaceholder = 'Search...',
  onSearch,
  emptyType = 'default',
  emptyTitle = 'No data found',
  emptyDescription,
  actions,
  pagination,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectionChange
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [search, setSearch] = useState('');
  
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(data.map(item => item._id));
    }
  };
  
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      onSelectionChange?.(selectedRows.filter(rowId => rowId !== id));
    } else {
      onSelectionChange?.([...selectedRows, id]);
    }
  };
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [search, setSearch] = useState('');
  
  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Search
    if (search && onSearch) {
      result = data.filter(item => 
        onSearch(item, search)
      );
    }
    
    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [data, search, sortConfig, onSearch]);
  
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-slate-300" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary-600" />
      : <ChevronDown className="w-4 h-4 text-primary-600" />;
  };
  
  const renderCell = (column, item, index) => {
    if (column.render) {
      return column.render(item);
    }
    
    const value = column.key ? item[column.key] : '';
    
    if (column.format) {
      return column.format(value, item);
    }
    
    return value;
  };
  
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
      
      {/* Table */}
      <div className="table-container">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        ) : processedData.length === 0 ? (
          <EmptyState 
            type={emptyType}
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table thead">
                <tr>
                  {selectable && (
                    <th className="w-12">
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="flex items-center justify-center"
                      >
                        {selectedRows.length === data.length ? (
                          <CheckSquare className="w-5 h-5 text-primary-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={clsx(
                        column.sortable && 'table-sortable',
                        column.className
                      )}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center gap-2">
                        {column.title}
                        {column.sortable && renderSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table tbody">
                {processedData.map((item, index) => {
                  const isSelected = selectedRows.includes(item._id);
                  return (
                    <tr
                      key={item._id || index}
                      className={clsx(
                        isSelected && 'selected',
                        onRowClick && 'cursor-pointer'
                      )}
                      onClick={() => onRowClick?.(item)}
                    >
                      {selectable && (
                        <td className="w-12">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRow(item._id);
                            }}
                            className="flex items-center justify-center"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-primary-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={clsx(column.className)}
                        >
                          {renderCell(column, item, index)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {pagination && processedData.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {pagination.from} to {pagination.to} of {pagination.total} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="btn-secondary p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="btn-secondary p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}