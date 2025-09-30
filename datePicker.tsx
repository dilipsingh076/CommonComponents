import React, { useState, useRef, useEffect } from 'react';

// Lightweight Day.js replacement
class DayJS {
  constructor(date) {
    this._date = date ? new Date(date) : new Date();
  }

  static isDayjs(obj) {
    return obj instanceof DayJS;
  }

  year() {
    return this._date.getFullYear();
  }

  month(m) {
    if (m !== undefined) {
      return new DayJS(new Date(this._date.getFullYear(), m, this._date.getDate()));
    }
    return this._date.getMonth();
  }

  date() {
    return this._date.getDate();
  }

  day() {
    return this._date.getDate();
  }

  daysInMonth() {
    return new Date(this.year(), this.month() + 1, 0).getDate();
  }

  format(fmt) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const y = this.year();
    const m = this.month();
    const d = this.date();
    
    return fmt
      .replace('YYYY', y)
      .replace('MMMM', months[m])
      .replace('MMM', monthsShort[m])
      .replace('MM', String(m + 1).padStart(2, '0'))
      .replace('DD', String(d).padStart(2, '0'));
  }

  toDate() {
    return this._date;
  }
}

const dayjs = (date) => new DayJS(date);

// Form Components
const Form = ({ children, onFinish, initialValues }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    React.Children.forEach(children, (child) => {
      if (child?.props?.name && child?.props?.rules) {
        const value = values[child.props.name];
        child.props.rules.forEach((rule) => {
          if (rule.required && !value) {
            newErrors[child.props.name] = rule.message;
          }
        });
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onFinish?.(values);
    }
  };

  const formContext = { values, setValues, errors };

  return (
    <div onSubmit={handleSubmit}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { formContext })
      )}
    </div>
  );
};

const FormItem = ({ children, label, name, rules, formContext }) => {
  const { values, setValues, errors } = formContext || {};
  
  const handleChange = (value) => {
    setValues?.((prev) => ({ ...prev, [name]: value }));
  };

  const childWithProps = React.cloneElement(children, {
    value: values?.[name],
    onChange: handleChange,
  });

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {childWithProps}
      {errors?.[name] && <div className="text-red-500 text-sm mt-1">{errors[name]}</div>}
    </div>
  );
};

Form.Item = FormItem;

const Button = ({ children, onClick, type, htmlType, className }) => {
  const baseClass = "px-4 py-2 rounded font-medium transition-colors";
  const typeClass = type === 'primary' 
    ? "bg-blue-500 text-white hover:bg-blue-600" 
    : "bg-gray-200 text-gray-700 hover:bg-gray-300";
  
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`${baseClass} ${typeClass} ${className || ''}`}
    >
      {children}
    </button>
  );
};

// ScrollPicker Component
const ScrollPicker = ({ items, value, onChange, label }) => {
  const containerRef = useRef(null);
  const itemHeight = 44;
  const visibleItems = 5; // Number of visible items (2 above + 1 selected + 2 below)
  const centerOffset = Math.floor(visibleItems / 2);

  useEffect(() => {
    if (containerRef.current && value !== null) {
      const index = items.findIndex(item => item.value === value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [value, items]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      const selectedItem = items[clampedIndex];
      
      if (selectedItem && selectedItem.value !== value) {
        onChange(selectedItem.value);
      }
    }
  };

  let scrollTimeout;
  const handleScrollEnd = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
        const targetScroll = clampedIndex * itemHeight;
        
        containerRef.current.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        const selectedItem = items[clampedIndex];
        if (selectedItem && selectedItem.value !== value) {
          onChange(selectedItem.value);
        }
      }
    }, 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScrollEnd);
    return () => {
      container.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, [items, value]);

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">{label}</div>
      <div className="relative w-full" style={{ height: `${itemHeight * visibleItems}px` }}>
        {/* Selection highlight area */}
        <div 
          className="absolute left-0 right-0 pointer-events-none z-10 rounded-lg"
          style={{ 
            top: `${itemHeight * centerOffset}px`,
            height: `${itemHeight}px`,
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        ></div>
        
        {/* Top gradient fade */}
        <div 
          className="absolute inset-x-0 top-0 pointer-events-none z-20"
          style={{
            height: `${itemHeight * 2}px`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)'
          }}
        ></div>
        
        {/* Bottom gradient fade */}
        <div 
          className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
          style={{
            height: `${itemHeight * 2}px`,
            background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)'
          }}
        ></div>
        
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll scrollbar-hide"
          style={{ 
            paddingTop: `${itemHeight * centerOffset}px`, 
            paddingBottom: `${itemHeight * centerOffset}px`,
          }}
        >
          {items.map((item, idx) => {
            const isSelected = item.value === value;
            return (
              <div
                key={idx}
                onClick={() => {
                  onChange(item.value);
                  containerRef.current.scrollTo({
                    top: idx * itemHeight,
                    behavior: 'smooth'
                  });
                }}
                className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-400 font-medium'
                }`}
                style={{ 
                  height: `${itemHeight}px`,
                  fontSize: isSelected ? '22px' : '16px',
                  letterSpacing: isSelected ? '-0.5px' : '0',
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// MobileDatePicker Component
const MobileDatePicker = ({ 
  value, 
  onChange, 
  format = 'YYYY-MM-DD',
  picker = ['month', 'day', 'year'] // Can be any combination: ['year'], ['month', 'year'], ['day', 'month', 'year'], etc.
}) => {
  const [visible, setVisible] = useState(false);
  
  const getCurrentDate = () => {
    if (value && DayJS.isDayjs(value)) {
      return value;
    }
    return dayjs();
  };
  
  const currentDate = getCurrentDate();
  
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());
  const [selectedDay, setSelectedDay] = useState(currentDate.date());

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - 50 + i;
    return { label: year.toString(), value: year };
  });

  const months = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Apr', value: 3 },
    { label: 'May', value: 4 },
    { label: 'Jun', value: 5 },
    { label: 'Jul', value: 6 },
    { label: 'Aug', value: 7 },
    { label: 'Sep', value: 8 },
    { label: 'Oct', value: 9 },
    { label: 'Nov', value: 10 },
    { label: 'Dec', value: 11 }
  ];

  const getDaysInMonth = (year, month) => {
    const daysCount = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysCount }, (_, i) => ({
      label: (i + 1).toString(),
      value: i + 1
    }));
  };

  const days = getDaysInMonth(selectedYear, selectedMonth);

  useEffect(() => {
    const maxDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    if (selectedDay > maxDay) {
      setSelectedDay(maxDay);
    }
  }, [selectedYear, selectedMonth]);

  const handleConfirm = () => {
    const newDate = dayjs(`${selectedYear}-${selectedMonth + 1}-${selectedDay}`);
    onChange?.(newDate);
    setVisible(false);
  };

  const handleCancel = () => {
    if (value && DayJS.isDayjs(value)) {
      setSelectedYear(value.year());
      setSelectedMonth(value.month());
      setSelectedDay(value.date());
    }
    setVisible(false);
  };

  const displayValue = value && DayJS.isDayjs(value) 
    ? value.format(format) 
    : 'Select Date';

  return (
    <div className="w-full">
      <div
        onClick={() => setVisible(true)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all bg-white shadow-sm hover:shadow-md"
      >
        <span className={`text-base ${value ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
          {displayValue}
        </span>
      </div>

      {visible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slideUp overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 bg-gray-50 border-b border-gray-200">
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 font-semibold text-base transition-colors"
              >
                Cancel
              </button>
              <h3 className="text-base font-bold text-gray-800">Select Date</h3>
              <button
                onClick={handleConfirm}
                className="text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors"
              >
                Done
              </button>
            </div>
            
            <div className="flex gap-1 px-4 py-6 bg-white">
              {picker.includes('month') && (
                <ScrollPicker
                  items={months}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  label="Month"
                />
              )}
              {picker.includes('day') && (
                <ScrollPicker
                  items={days}
                  value={selectedDay}
                  onChange={setSelectedDay}
                  label="Day"
                />
              )}
              {picker.includes('year') && (
                <ScrollPicker
                  items={years}
                  value={selectedYear}
                  onChange={setSelectedYear}
                  label="Year"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

// Demo Component
export default function App() {
  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    alert(`Birthday: ${values.birthday?.format('YYYY-MM-DD')}\nYear Only: ${values.yearOnly?.format('YYYY')}\nMonth/Year: ${values.monthYear?.format('MM/YYYY')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Mobile DatePicker
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Dynamic picker - use any combination of month/day/year
          </p>

          <Form
            onFinish={handleSubmit}
            initialValues={{
              birthday: dayjs(),
              yearOnly: dayjs(),
              monthYear: dayjs()
            }}
          >
            <Form.Item
              label="Full Date (Month, Day, Year)"
              name="birthday"
              rules={[{ required: true, message: 'Required!' }]}
            >
              <MobileDatePicker 
                format="MMMM DD, YYYY"
                picker={['month', 'day', 'year']}
              />
            </Form.Item>

            <Form.Item
              label="Year Only"
              name="yearOnly"
            >
              <MobileDatePicker 
                format="YYYY"
                picker={['year']}
              />
            </Form.Item>

            <Form.Item
              label="Month and Year"
              name="monthYear"
            >
              <MobileDatePicker 
                format="MMM YYYY"
                picker={['month', 'year']}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-10 text-base"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Dynamic picker combinations</li>
            <li>✓ Use ['year'], ['month', 'year'], or ['month', 'day', 'year']</li>
            <li>✓ Fixed selection alignment</li>
            <li>✓ All 12 months included</li>
            <li>✓ Smooth scrolling</li>
            <li>✓ Click or scroll to select</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
