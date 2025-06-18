
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, SortAsc, SortDesc } from 'lucide-react';
import { Task } from '@/types';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MissionLogProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onTaskComplete?: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onStartFocus?: (task: Task) => void;
}

const MissionLog: React.FC<MissionLogProps> = ({
  tasks = [], // Provide default empty array
  onTaskClick = () => {},
  onTaskComplete = () => {},
  onTaskEdit = () => {},
  onTaskDelete = () => {},
  onStartFocus = () => {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Get unique categories from tasks
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tasks.map((task) => task.category)));
    return uniqueCategories.sort();
  }, [tasks]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date(0);
          bValue = b.dueDate ? new Date(b.dueDate) : new Date(0);
          break;
        case 'priority':
          const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          break;
        case 'status':
          const statusOrder = { 'pending': 1, 'in-progress': 2, 'completed': 3 };
          aValue = statusOrder[a.status as keyof typeof statusOrder] || 0;
          bValue = statusOrder[b.status as keyof typeof statusOrder] || 0;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    urgent: tasks.filter((t) => t.priority === 'urgent').length
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    if (status === 'completed') {
      onTaskComplete(taskId);
    }
    // Handle other status changes if needed
  };

  return (
    <div className="p-6 space-y-6" data-id="lhjgzlga7" data-path="src/components/MissionLog.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="3u2r8fvlf" data-path="src/components/MissionLog.tsx">
        <div data-id="75puup1zz" data-path="src/components/MissionLog.tsx">
          <h1 className="text-3xl font-bold text-white mb-2" data-id="ih6lumzzh" data-path="src/components/MissionLog.tsx">📋 Mission Log</h1>
          <p className="text-gray-300" data-id="d7e7okwyj" data-path="src/components/MissionLog.tsx">Manage and track your assigned missions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-id="suz1b8gt6" data-path="src/components/MissionLog.tsx">
        <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="bczrscvlr" data-path="src/components/MissionLog.tsx">
          <div className="text-2xl font-bold text-white" data-id="p1xeesgch" data-path="src/components/MissionLog.tsx">{taskCounts.total}</div>
          <div className="text-sm text-gray-400" data-id="t11zmdt3v" data-path="src/components/MissionLog.tsx">Total Missions</div>
        </div>
        
        <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="d3x81rt9k" data-path="src/components/MissionLog.tsx">
          <div className="text-2xl font-bold text-yellow-400" data-id="kxrx0r9gz" data-path="src/components/MissionLog.tsx">{taskCounts.pending}</div>
          <div className="text-sm text-gray-400" data-id="5w9xgqbf8" data-path="src/components/MissionLog.tsx">Pending</div>
        </div>
        
        <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="2un5d9knu" data-path="src/components/MissionLog.tsx">
          <div className="text-2xl font-bold text-blue-400" data-id="v4h306rnf" data-path="src/components/MissionLog.tsx">{taskCounts.inProgress}</div>
          <div className="text-sm text-gray-400" data-id="1sdu2ek1m" data-path="src/components/MissionLog.tsx">In Progress</div>
        </div>
        
        <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="xkq7ojbqm" data-path="src/components/MissionLog.tsx">
          <div className="text-2xl font-bold text-green-400" data-id="6jaavtj47" data-path="src/components/MissionLog.tsx">{taskCounts.completed}</div>
          <div className="text-sm text-gray-400" data-id="3n76jpykh" data-path="src/components/MissionLog.tsx">Completed</div>
        </div>
        
        <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="ev2oenfi6" data-path="src/components/MissionLog.tsx">
          <div className="text-2xl font-bold text-red-400" data-id="0zbwxqavp" data-path="src/components/MissionLog.tsx">{taskCounts.urgent}</div>
          <div className="text-sm text-gray-400" data-id="q2j9nfkdy" data-path="src/components/MissionLog.tsx">Urgent</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg" data-id="al5wckomj" data-path="src/components/MissionLog.tsx">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4" data-id="th5o5gyxt" data-path="src/components/MissionLog.tsx">
          {/* Search */}
          <div className="lg:col-span-2" data-id="tnhtn6unc" data-path="src/components/MissionLog.tsx">
            <div className="relative" data-id="nlix3r055" data-path="src/components/MissionLog.tsx">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" data-id="baf03lojf" data-path="src/components/MissionLog.tsx" />
              <Input
                placeholder="Search missions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white" data-id="ke8ucikg6" data-path="src/components/MissionLog.tsx" />

            </div>
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter} data-id="xaf0km1xt" data-path="src/components/MissionLog.tsx">
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white" data-id="1tvkdr6vo" data-path="src/components/MissionLog.tsx">
              <SelectValue placeholder="All Status" data-id="hgthvwi8o" data-path="src/components/MissionLog.tsx" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600" data-id="xv7dg4bg7" data-path="src/components/MissionLog.tsx">
              <SelectItem value="all" data-id="prfsws5jt" data-path="src/components/MissionLog.tsx">All Status</SelectItem>
              <SelectItem value="pending" data-id="6d5hn42vs" data-path="src/components/MissionLog.tsx">Pending</SelectItem>
              <SelectItem value="in-progress" data-id="e5a4127fi" data-path="src/components/MissionLog.tsx">In Progress</SelectItem>
              <SelectItem value="completed" data-id="1orbv8viw" data-path="src/components/MissionLog.tsx">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter} data-id="8oj93vceq" data-path="src/components/MissionLog.tsx">
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white" data-id="l5i1u7tve" data-path="src/components/MissionLog.tsx">
              <SelectValue placeholder="All Priority" data-id="ofydnr81s" data-path="src/components/MissionLog.tsx" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600" data-id="q1iioyp5b" data-path="src/components/MissionLog.tsx">
              <SelectItem value="all" data-id="qczdw4nur" data-path="src/components/MissionLog.tsx">All Priority</SelectItem>
              <SelectItem value="urgent" data-id="mgcnpp7n5" data-path="src/components/MissionLog.tsx">🔴 Urgent</SelectItem>
              <SelectItem value="high" data-id="q7oo4vopb" data-path="src/components/MissionLog.tsx">🟠 High</SelectItem>
              <SelectItem value="medium" data-id="927iiacju" data-path="src/components/MissionLog.tsx">🟡 Medium</SelectItem>
              <SelectItem value="low" data-id="pnk7geb4u" data-path="src/components/MissionLog.tsx">🟢 Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter} data-id="ac328j0wv" data-path="src/components/MissionLog.tsx">
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white" data-id="ki460eq69" data-path="src/components/MissionLog.tsx">
              <SelectValue placeholder="All Categories" data-id="v48bofa17" data-path="src/components/MissionLog.tsx" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600" data-id="tnl38slus" data-path="src/components/MissionLog.tsx">
              <SelectItem value="all" data-id="dkrtxupv8" data-path="src/components/MissionLog.tsx">All Categories</SelectItem>
              {categories.map((category) =>
              <SelectItem key={category} value={category} data-id="83ril7x10" data-path="src/components/MissionLog.tsx">{category}</SelectItem>
              )}
            </SelectContent>
          </Select>

          {/* Sort */}
          <div className="flex gap-2" data-id="mn3rge36c" data-path="src/components/MissionLog.tsx">
            <Select value={sortBy} onValueChange={setSortBy} data-id="dbcdfatdv" data-path="src/components/MissionLog.tsx">
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white" data-id="6fg82yi1m" data-path="src/components/MissionLog.tsx">
                <SelectValue placeholder="Sort by" data-id="cixtl0qxt" data-path="src/components/MissionLog.tsx" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600" data-id="utvvos75a" data-path="src/components/MissionLog.tsx">
                <SelectItem value="createdAt" data-id="1mtw3nkxf" data-path="src/components/MissionLog.tsx">Created</SelectItem>
                <SelectItem value="dueDate" data-id="2d1c1uo9k" data-path="src/components/MissionLog.tsx">Due Date</SelectItem>
                <SelectItem value="title" data-id="bnfkjxu8u" data-path="src/components/MissionLog.tsx">Title</SelectItem>
                <SelectItem value="priority" data-id="rvr0ihx2v" data-path="src/components/MissionLog.tsx">Priority</SelectItem>
                <SelectItem value="status" data-id="eld44oirp" data-path="src/components/MissionLog.tsx">Status</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              className="border-gray-600 text-gray-300 hover:bg-gray-700" data-id="xnt8lo2hm" data-path="src/components/MissionLog.tsx">

              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" data-id="1aseozrqw" data-path="src/components/MissionLog.tsx" /> : <SortDesc className="w-4 h-4" data-id="21mo7iiba" data-path="src/components/MissionLog.tsx" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-4" data-id="l0x2iunuz" data-path="src/components/MissionLog.tsx">
        <div className="flex items-center justify-between" data-id="m64086dua" data-path="src/components/MissionLog.tsx">
          <h2 className="text-xl font-semibold text-white" data-id="nj3fyl95l" data-path="src/components/MissionLog.tsx">
            Missions ({filteredAndSortedTasks.length})
          </h2>
          
          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all') &&
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setCategoryFilter('all');
            }}
            className="border-gray-600 text-gray-300 hover:bg-gray-700" data-id="8x0tgabyx" data-path="src/components/MissionLog.tsx">

              Clear Filters
            </Button>
          }
        </div>

        <AnimatePresence data-id="tapkctu9f" data-path="src/components/MissionLog.tsx">
          {filteredAndSortedTasks.length > 0 ?
          <div className="grid gap-4" data-id="82582wu7f" data-path="src/components/MissionLog.tsx">
              {filteredAndSortedTasks.map((task) =>
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
              onStartFocus={onStartFocus}
              onClick={onTaskClick} data-id="rkrosl473" data-path="src/components/MissionLog.tsx" />

            )}
            </div> :

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12" data-id="ogakevbsh" data-path="src/components/MissionLog.tsx">

              <div className="text-gray-500 mb-4" data-id="fdgf07tj5" data-path="src/components/MissionLog.tsx">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" data-id="y4rskitof" data-path="src/components/MissionLog.tsx" />
                <h3 className="text-lg font-medium mb-2 text-white" data-id="bbca6myoh" data-path="src/components/MissionLog.tsx">No missions found</h3>
                <p className="text-sm" data-id="iv0qklu4i" data-path="src/components/MissionLog.tsx">
                  {tasks.length === 0 ?
                "Create your first mission to get started" :
                "Try adjusting your filters or search terms"
                }
                </p>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

};

export default MissionLog;