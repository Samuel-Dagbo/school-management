import { FolderOpen, Search, Users, BookOpen, FileText, Calendar, Image, GraduationCap, Inbox } from 'lucide-react';

const icons = {
  folder: FolderOpen,
  search: Search,
  users: Users,
  book: BookOpen,
  file: FileText,
  calendar: Calendar,
  image: Image,
  student: GraduationCap,
  inbox: Inbox,
  default: Inbox
};

export default function EmptyState({ 
  type = 'default', 
  title = 'No data found', 
  description,
  action,
  icon
}) {
  const Icon = icon ? icons[icon] || icons.default : (icons[type] || icons.default);
  
  return (
    <div className="empty-state">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {description && (
        <p className="empty-state-description">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}