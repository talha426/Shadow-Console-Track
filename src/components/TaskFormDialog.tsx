import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editingTask?: Task | null;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    category: '',
    priority: 'C' as Task['priority'],
    status: 'Not Started' as Task['status'],
    xpValue: 20
  });

  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const predefinedCategories = ['Study', 'Work', 'Fitness', 'Personal', 'Health', 'Learning'];

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        startDate: editingTask.startDate,
        endDate: editingTask.endDate,
        category: editingTask.category,
        priority: editingTask.priority,
        status: editingTask.status,
        xpValue: editingTask.xpValue
      });

      if (!predefinedCategories.includes(editingTask.category)) {
        setCustomCategory(editingTask.category);
        setShowCustomCategory(true);
      }
    } else {
      // Reset form for new task
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      setFormData({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: tomorrow,
        category: '',
        priority: 'C',
        status: 'Not Started',
        xpValue: 20
      });
      setCustomCategory('');
      setShowCustomCategory(false);
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      ...formData,
      category: showCustomCategory ? customCategory : formData.category,
      completedAt: formData.status === 'Completed' ? new Date() : undefined
    };

    onSave(taskData);
    onClose();
  };

  const getPriorityXP = (priority: Task['priority']) => {
    const xpValues = { 'E': 5, 'D': 10, 'C': 20, 'B': 35, 'A': 50, 'S': 75 };
    return xpValues[priority];
  };

  const handlePriorityChange = (priority: Task['priority']) => {
    setFormData({
      ...formData,
      priority,
      xpValue: getPriorityXP(priority)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="yq97nmq3q" data-path="src/components/TaskFormDialog.tsx">
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-purple-500/30" data-id="hh9stsk1i" data-path="src/components/TaskFormDialog.tsx">
        <DialogHeader data-id="afdiuio4v" data-path="src/components/TaskFormDialog.tsx">
          <DialogTitle className="text-2xl font-bold orbitron text-white" data-id="ovy7jh8hx" data-path="src/components/TaskFormDialog.tsx">
            {editingTask ? 'Edit Mission' : 'Create New Mission'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" data-id="zep327izq" data-path="src/components/TaskFormDialog.tsx">
          {/* Title */}
          <div className="space-y-2" data-id="zhhw3hlgg" data-path="src/components/TaskFormDialog.tsx">
            <Label htmlFor="title" className="text-white" data-id="eyx2mzn5c" data-path="src/components/TaskFormDialog.tsx">Mission Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-white"
              placeholder="Enter mission title..."
              required data-id="jgc8j1kv0" data-path="src/components/TaskFormDialog.tsx" />

          </div>

          {/* Description */}
          <div className="space-y-2" data-id="1uveqg1zq" data-path="src/components/TaskFormDialog.tsx">
            <Label htmlFor="description" className="text-white" data-id="yaxe0pfle" data-path="src/components/TaskFormDialog.tsx">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-white resize-none"
              placeholder="Describe your mission..."
              rows={3} data-id="9l6u4bgh8" data-path="src/components/TaskFormDialog.tsx" />

          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4" data-id="lgmbeb3ue" data-path="src/components/TaskFormDialog.tsx">
            <div className="space-y-2" data-id="6e6hg6u0w" data-path="src/components/TaskFormDialog.tsx">
              <Label className="text-white" data-id="nly8etbxw" data-path="src/components/TaskFormDialog.tsx">Start Date</Label>
              <Popover data-id="0d5oxu3wn" data-path="src/components/TaskFormDialog.tsx">
                <PopoverTrigger asChild data-id="cxxxh58nu" data-path="src/components/TaskFormDialog.tsx">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-800/50 border-purple-500/30 text-white",
                      !formData.startDate && "text-muted-foreground"
                    )} data-id="ent55nhos" data-path="src/components/TaskFormDialog.tsx">

                    <CalendarIcon className="mr-2 h-4 w-4" data-id="n5z25mwrr" data-path="src/components/TaskFormDialog.tsx" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-purple-500/30" data-id="c7eqtg18z" data-path="src/components/TaskFormDialog.tsx">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                    initialFocus
                    className="text-white" data-id="fknamwmih" data-path="src/components/TaskFormDialog.tsx" />

                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2" data-id="61qg30yzh" data-path="src/components/TaskFormDialog.tsx">
              <Label className="text-white" data-id="zrtne824l" data-path="src/components/TaskFormDialog.tsx">End Date</Label>
              <Popover data-id="5ieveydp7" data-path="src/components/TaskFormDialog.tsx">
                <PopoverTrigger asChild data-id="qjwgy529a" data-path="src/components/TaskFormDialog.tsx">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-800/50 border-purple-500/30 text-white",
                      !formData.endDate && "text-muted-foreground"
                    )} data-id="tm0m31ujp" data-path="src/components/TaskFormDialog.tsx">

                    <CalendarIcon className="mr-2 h-4 w-4" data-id="zcev1dtpu" data-path="src/components/TaskFormDialog.tsx" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-purple-500/30" data-id="z0tbbx7dy" data-path="src/components/TaskFormDialog.tsx">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                    initialFocus
                    className="text-white" data-id="4ww4zt34f" data-path="src/components/TaskFormDialog.tsx" />

                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2" data-id="1alivm30g" data-path="src/components/TaskFormDialog.tsx">
            <Label className="text-white" data-id="4vuxgrksh" data-path="src/components/TaskFormDialog.tsx">Category</Label>
            <div className="space-y-3" data-id="ykd1hrbeq" data-path="src/components/TaskFormDialog.tsx">
              <Select
                value={showCustomCategory ? 'custom' : formData.category}
                onValueChange={(value) => {
                  if (value === 'custom') {
                    setShowCustomCategory(true);
                    setFormData({ ...formData, category: '' });
                  } else {
                    setShowCustomCategory(false);
                    setFormData({ ...formData, category: value });
                  }
                }} data-id="uc6mh676g" data-path="src/components/TaskFormDialog.tsx">

                <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white" data-id="sduk1s6h2" data-path="src/components/TaskFormDialog.tsx">
                  <SelectValue placeholder="Select category" data-id="w93h7clrz" data-path="src/components/TaskFormDialog.tsx" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30" data-id="h7hq740qb" data-path="src/components/TaskFormDialog.tsx">
                  {predefinedCategories.map((category) =>
                  <SelectItem key={category} value={category} data-id="3aupu5u0p" data-path="src/components/TaskFormDialog.tsx">{category}</SelectItem>
                  )}
                  <SelectItem value="custom" data-id="o9wv6afmo" data-path="src/components/TaskFormDialog.tsx">Custom Category</SelectItem>
                </SelectContent>
              </Select>

              {showCustomCategory &&
              <Input
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="bg-slate-800/50 border-purple-500/30 text-white"
                placeholder="Enter custom category..."
                required data-id="ybq5cx01o" data-path="src/components/TaskFormDialog.tsx" />

              }
            </div>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4" data-id="g9aiyzzx9" data-path="src/components/TaskFormDialog.tsx">
            <div className="space-y-2" data-id="nuecdq83c" data-path="src/components/TaskFormDialog.tsx">
              <Label className="text-white" data-id="v0y7olkm6" data-path="src/components/TaskFormDialog.tsx">Priority Rank</Label>
              <Select
                value={formData.priority}
                onValueChange={handlePriorityChange} data-id="h3j5r13wy" data-path="src/components/TaskFormDialog.tsx">

                <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white" data-id="ztej89hia" data-path="src/components/TaskFormDialog.tsx">
                  <SelectValue data-id="2ilwk9b1m" data-path="src/components/TaskFormDialog.tsx" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30" data-id="9g58j9ch9" data-path="src/components/TaskFormDialog.tsx">
                  <SelectItem value="E" data-id="ji7z0xu2r" data-path="src/components/TaskFormDialog.tsx">E-Rank (5 XP)</SelectItem>
                  <SelectItem value="D" data-id="ys18s7h8r" data-path="src/components/TaskFormDialog.tsx">D-Rank (10 XP)</SelectItem>
                  <SelectItem value="C" data-id="zf25ana6d" data-path="src/components/TaskFormDialog.tsx">C-Rank (20 XP)</SelectItem>
                  <SelectItem value="B" data-id="zpdkgktz8" data-path="src/components/TaskFormDialog.tsx">B-Rank (35 XP)</SelectItem>
                  <SelectItem value="A" data-id="x18zjmbcu" data-path="src/components/TaskFormDialog.tsx">A-Rank (50 XP)</SelectItem>
                  <SelectItem value="S" data-id="0208wchnf" data-path="src/components/TaskFormDialog.tsx">S-Rank (75 XP)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2" data-id="ydwkulruw" data-path="src/components/TaskFormDialog.tsx">
              <Label className="text-white" data-id="wxvlgdw98" data-path="src/components/TaskFormDialog.tsx">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Task['status']) => setFormData({ ...formData, status: value })} data-id="d6arjr5yf" data-path="src/components/TaskFormDialog.tsx">

                <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white" data-id="ig4h0dfpq" data-path="src/components/TaskFormDialog.tsx">
                  <SelectValue data-id="amwfm3frl" data-path="src/components/TaskFormDialog.tsx" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-500/30" data-id="jn2dzow1q" data-path="src/components/TaskFormDialog.tsx">
                  <SelectItem value="Not Started" data-id="10x2bj9vc" data-path="src/components/TaskFormDialog.tsx">Not Started</SelectItem>
                  <SelectItem value="In Progress" data-id="wfzlyrycl" data-path="src/components/TaskFormDialog.tsx">In Progress</SelectItem>
                  <SelectItem value="Completed" data-id="dy5fb5xbq" data-path="src/components/TaskFormDialog.tsx">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* XP Value Display */}
          <div className="glass-panel rounded-lg p-4" data-id="l4dmhcwin" data-path="src/components/TaskFormDialog.tsx">
            <div className="flex items-center justify-between" data-id="rv01cs4wl" data-path="src/components/TaskFormDialog.tsx">
              <span className="text-white font-medium" data-id="aj0jmz6xx" data-path="src/components/TaskFormDialog.tsx">Mission Reward</span>
              <div className="flex items-center space-x-2" data-id="ggoyjv6n5" data-path="src/components/TaskFormDialog.tsx">
                <span className="text-2xl font-bold text-purple-300 xp-glow" data-id="aoj3rq7m5" data-path="src/components/TaskFormDialog.tsx">{formData.xpValue}</span>
                <span className="text-purple-300" data-id="bdqt0rlur" data-path="src/components/TaskFormDialog.tsx">XP</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1" data-id="ib7z4es7h" data-path="src/components/TaskFormDialog.tsx">
              XP value based on priority rank. Bonus XP for early completion!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-purple-500/20" data-id="zeof9kfes" data-path="src/components/TaskFormDialog.tsx">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-purple-500/30 text-white hover:bg-purple-500/10" data-id="mysab1whv" data-path="src/components/TaskFormDialog.tsx">

              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600" data-id="lco3jq0dt" data-path="src/components/TaskFormDialog.tsx">

              {editingTask ? 'Update Mission' : 'Create Mission'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>);

};

export default TaskFormDialog;