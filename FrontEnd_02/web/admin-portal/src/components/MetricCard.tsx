import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  variant?: 'default' | 'pothe' | 'warning' | 'danger';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}) => {
  const getIconStyles = () => {
    switch (variant) {
      case 'pothe':
        return 'bg-pothe-50 text-pothe-700 border-pothe-200';
      case 'warning':
        return 'bg-status-amber/10 text-status-amber border-status-amber/30';
      case 'danger':
        return 'bg-status-red/10 text-status-red border-status-red/30';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg border ${getIconStyles()}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
          {trend ? (
            <span
              className={`font-semibold inline-flex items-center gap-1 ${
                trend.isPositive ? 'text-status-green' : 'text-status-red'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'} {trend.value}</span>
              {trend.period && <span className="text-neutral-600 font-normal">{trend.period}</span>}
            </span>
          ) : (
            <span />
          )}
          {subtitle && <span className="text-neutral-600">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
