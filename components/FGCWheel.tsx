'use client';

import { FGCCategory, FGC_CATEGORIES, getFGCClassesByCategory } from '@/lib/fgc-data';

interface FGCWheelProps {
  highlightCategory?: FGCCategory;
  highlightCode?: string;
}

export default function FGCWheel({ highlightCategory, highlightCode }: FGCWheelProps) {
  const categories: FGCCategory[] = ['FOOD', 'LIFE', 'FIGHT', 'SEX', 'COMPLAINT'];

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Center circle */}
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Center text */}
        <text
          x="200"
          y="190"
          textAnchor="middle"
          className="text-2xl font-bold fill-gray-800"
          style={{ fontSize: '24px' }}
        >
          FGC2.3
        </text>
        <text
          x="200"
          y="210"
          textAnchor="middle"
          className="text-sm fill-gray-600"
          style={{ fontSize: '12px' }}
        >
          Feline Glossary
        </text>
        <text
          x="200"
          y="225"
          textAnchor="middle"
          className="text-sm fill-gray-600"
          style={{ fontSize: '12px' }}
        >
          Classification
        </text>

        {/* Segments */}
        {categories.map((category, index) => {
          const startAngle = (index * 72) - 90; // Start from top, 72 degrees per section
          const endAngle = startAngle + 72;
          const isHighlighted = highlightCategory === category;
          const categoryData = FGC_CATEGORIES[category];
          const classes = getFGCClassesByCategory(category);

          // Calculate arc path
          const innerRadius = 85;
          const outerRadius = 180;

          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;

          const x1 = 200 + innerRadius * Math.cos(startAngleRad);
          const y1 = 200 + innerRadius * Math.sin(startAngleRad);
          const x2 = 200 + outerRadius * Math.cos(startAngleRad);
          const y2 = 200 + outerRadius * Math.sin(startAngleRad);
          const x3 = 200 + outerRadius * Math.cos(endAngleRad);
          const y3 = 200 + outerRadius * Math.sin(endAngleRad);
          const x4 = 200 + innerRadius * Math.cos(endAngleRad);
          const y4 = 200 + innerRadius * Math.sin(endAngleRad);

          const largeArcFlag = 0;

          const pathData = `
            M ${x1} ${y1}
            L ${x2} ${y2}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
            L ${x4} ${y4}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
          `;

          // Label position
          const labelAngle = startAngle + 36;
          const labelAngleRad = (labelAngle * Math.PI) / 180;
          const labelRadius = 135;
          const labelX = 200 + labelRadius * Math.cos(labelAngleRad);
          const labelY = 200 + labelRadius * Math.sin(labelAngleRad);

          return (
            <g key={category}>
              {/* Segment */}
              <path
                d={pathData}
                fill={categoryData.color}
                opacity={isHighlighted ? 1 : 0.7}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: isHighlighted ? 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' : 'none',
                  transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: '200px 200px'
                }}
              />

              {/* Category label */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold fill-white pointer-events-none"
                style={{ fontSize: isHighlighted ? '18px' : '16px' }}
              >
                {categoryData.name.toUpperCase()}
              </text>

              {/* Class count indicator */}
              <text
                x={labelX}
                y={labelY + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-white/80 pointer-events-none"
                style={{ fontSize: '11px' }}
              >
                {classes.length} sounds
              </text>
            </g>
          );
        })}

        {/* Decorative lines radiating from center */}
        {categories.map((_, index) => {
          const angle = (index * 72) - 90;
          const angleRad = (angle * Math.PI) / 180;
          const x1 = 200 + 80 * Math.cos(angleRad);
          const y1 = 200 + 80 * Math.sin(angleRad);
          const x2 = 200 + 85 * Math.cos(angleRad);
          const y2 = 200 + 85 * Math.sin(angleRad);

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => {
          const categoryData = FGC_CATEGORIES[category];
          const isHighlighted = highlightCategory === category;

          return (
            <div
              key={category}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                isHighlighted ? 'bg-gray-100 scale-105' : ''
              }`}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryData.color }}
              />
              <div className="text-sm">
                <div className="font-semibold text-gray-800">{categoryData.name}</div>
                <div className="text-xs text-gray-500">
                  {getFGCClassesByCategory(category).length} types
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
