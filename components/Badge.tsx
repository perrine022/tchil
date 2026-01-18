interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-black text-white',
    warning: 'bg-black text-white border border-black',
    success: 'bg-white text-black border border-black',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
