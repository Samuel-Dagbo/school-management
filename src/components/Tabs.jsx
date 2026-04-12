import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

export function Tabs({ items, activeTab }) {
  return (
    <div className="tabs">
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.path}
          className={clsx(
            activeTab === item.key ? 'tab-active' : 'tab'
          )}
        >
          {item.icon && <item.icon className="w-4 h-4 mr-2" />}
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function TabPanel({ children, className }) {
  return (
    <div className={clsx('pt-6', className)}>
      {children}
    </div>
  );
}