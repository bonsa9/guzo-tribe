import React from 'react';

export default function ContactDepartmentSelector({
  lang,
  departments,
  selectedDept,
  onSelectDept
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider text-center">
        {lang === 'am' ? 'የጥያቄዎን አይነት ይምረጡ' : 'Select Department / Topic'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = selectedDept === dept.id;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => onSelectDept(dept.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/50 scale-[1.02]'
                  : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? 'bg-emerald-800 text-amber-300'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200">
                    {lang === 'am' ? 'የተመረጠ' : 'Selected'}
                  </span>
                )}
              </div>
              <div>
                <h3
                  className={`font-bold text-sm mb-1 ${
                    isSelected ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {dept.title}
                </h3>
                <p
                  className={`text-xs leading-snug ${
                    isSelected ? 'text-emerald-100' : 'text-stone-500'
                  }`}
                >
                  {dept.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
