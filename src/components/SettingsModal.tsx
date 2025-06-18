import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useSettings } from '@/contexts/SettingsContext';
import { Volume2, VolumeX, Palette, Bell, Zap, Minimize2, Globe, Save, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSetting, resetSettings } = useSettings();

  const settingSections = [
  {
    title: 'Audio & Sound',
    icon: settings.volume ? Volume2 : VolumeX,
    settings: [
    {
      key: 'volume' as const,
      label: 'Master Volume',
      description: 'Enable or disable all sounds',
      type: 'switch' as const
    },
    {
      key: 'soundEffects' as const,
      label: 'Sound Effects',
      description: 'Play sounds for task completion and level ups',
      type: 'switch' as const
    }]

  },
  {
    title: 'Appearance',
    icon: Palette,
    settings: [
    {
      key: 'theme' as const,
      label: 'Theme',
      description: 'Choose your preferred theme',
      type: 'select' as const,
      options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' }]

    },
    {
      key: 'animation' as const,
      label: 'Animations',
      description: 'Enable smooth animations and transitions',
      type: 'switch' as const
    },
    {
      key: 'compactMode' as const,
      label: 'Compact Mode',
      description: 'Reduce spacing for more content',
      type: 'switch' as const
    }]

  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
    {
      key: 'notifications' as const,
      label: 'Push Notifications',
      description: 'Receive notifications for task reminders',
      type: 'switch' as const
    }]

  },
  {
    title: 'General',
    icon: Save,
    settings: [
    {
      key: 'autoSave' as const,
      label: 'Auto Save',
      description: 'Automatically save changes',
      type: 'switch' as const
    },
    {
      key: 'language' as const,
      label: 'Language',
      description: 'Select your preferred language',
      type: 'select' as const,
      options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'fr', label: 'Français' },
      { value: 'de', label: 'Deutsch' }]

    }]

  }];


  const handleReset = () => {
    resetSettings();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="jlzes6yqa" data-path="src/components/SettingsModal.tsx">
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-id="tnzjd1pza" data-path="src/components/SettingsModal.tsx">
        <DialogHeader data-id="bqno0ojnn" data-path="src/components/SettingsModal.tsx">
          <DialogTitle className="flex items-center gap-2 text-2xl" data-id="5dx7sk77y" data-path="src/components/SettingsModal.tsx">
            <Zap className="h-6 w-6 text-purple-500" data-id="ectr9whsi" data-path="src/components/SettingsModal.tsx" />
            Settings & Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6" data-id="h97kab9wm" data-path="src/components/SettingsModal.tsx">
          {settingSections.map((section, sectionIndex) =>
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="space-y-4" data-id="aed3hgd7n" data-path="src/components/SettingsModal.tsx">

              <div className="flex items-center gap-2" data-id="7xmp4fbnr" data-path="src/components/SettingsModal.tsx">
                <section.icon className="h-5 w-5 text-purple-500" data-id="mjqwinab5" data-path="src/components/SettingsModal.tsx" />
                <h3 className="text-lg font-semibold" data-id="6z59n1s42" data-path="src/components/SettingsModal.tsx">{section.title}</h3>
              </div>

              <div className="space-y-4 pl-7" data-id="nl8bdye11" data-path="src/components/SettingsModal.tsx">
                {section.settings.map((setting) =>
              <div key={setting.key} className="flex items-center justify-between" data-id="27ccwc675" data-path="src/components/SettingsModal.tsx">
                    <div className="space-y-1" data-id="jb4ipl7uq" data-path="src/components/SettingsModal.tsx">
                      <Label htmlFor={setting.key} className="text-sm font-medium" data-id="f51rp6624" data-path="src/components/SettingsModal.tsx">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-muted-foreground" data-id="04yi0vn07" data-path="src/components/SettingsModal.tsx">
                        {setting.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2" data-id="k678vxxdf" data-path="src/components/SettingsModal.tsx">
                      {setting.type === 'switch' &&
                  <Switch
                    id={setting.key}
                    checked={settings[setting.key] as boolean}
                    onCheckedChange={(checked) =>
                    updateSetting(setting.key, checked)
                    } data-id="8vcd4qa0k" data-path="src/components/SettingsModal.tsx" />

                  }

                      {setting.type === 'select' && setting.options &&
                  <Select
                    value={settings[setting.key] as string}
                    onValueChange={(value) =>
                    updateSetting(setting.key, value as any)
                    } data-id="anxcsjo56" data-path="src/components/SettingsModal.tsx">

                          <SelectTrigger className="w-32" data-id="yo8o39qp3" data-path="src/components/SettingsModal.tsx">
                            <SelectValue data-id="ugooqi9ra" data-path="src/components/SettingsModal.tsx" />
                          </SelectTrigger>
                          <SelectContent data-id="a364xt0uj" data-path="src/components/SettingsModal.tsx">
                            {setting.options.map((option) =>
                      <SelectItem key={option.value} value={option.value} data-id="n9ziydmdk" data-path="src/components/SettingsModal.tsx">
                                {option.label}
                              </SelectItem>
                      )}
                          </SelectContent>
                        </Select>
                  }
                    </div>
                  </div>
              )}
              </div>

              {sectionIndex < settingSections.length - 1 && <Separator data-id="d4jww6hh2" data-path="src/components/SettingsModal.tsx" />}
            </motion.div>
          )}

          <Separator data-id="z1eb7zwc7" data-path="src/components/SettingsModal.tsx" />

          <div className="flex items-center justify-between pt-4" data-id="8l38iwxl9" data-path="src/components/SettingsModal.tsx">
            <div className="flex items-center gap-2" data-id="759tutoru" data-path="src/components/SettingsModal.tsx">
              <Badge variant="secondary" className="text-xs" data-id="9h094asug" data-path="src/components/SettingsModal.tsx">
                Settings are saved automatically
              </Badge>
            </div>

            <div className="flex gap-2" data-id="e1h9vzlcs" data-path="src/components/SettingsModal.tsx">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-2" data-id="cq0fdv0m4" data-path="src/components/SettingsModal.tsx">

                <RotateCcw className="h-4 w-4" data-id="7f3xnglwm" data-path="src/components/SettingsModal.tsx" />
                Reset to Default
              </Button>
              <Button onClick={onClose} data-id="rkgh8j6dk" data-path="src/components/SettingsModal.tsx">Done</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);

};

export default SettingsModal;