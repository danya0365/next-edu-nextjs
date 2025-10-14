interface AvatarFallbackProps {
  name: string;
  size?: number;
  fontSize?: string;
  gradient?: 'blue-purple' | 'purple-pink' | 'green-teal' | 'orange-red';
}

const gradientClasses = {
  'blue-purple': 'from-blue-600 to-purple-600',
  'purple-pink': 'from-purple-500 to-pink-500',
  'green-teal': 'from-green-500 to-teal-500',
  'orange-red': 'from-orange-500 to-red-500',
};

/**
 * Avatar fallback component showing first 2 letters of name
 * Used when avatar image fails to load
 */
export function AvatarFallback({
  name,
  size = 32,
  fontSize = 'text-sm',
  gradient = 'blue-purple',
}: AvatarFallbackProps) {
  const initials = name.substring(0, 2).toUpperCase();
  const gradientClass = gradientClasses[gradient];

  return (
    <div
      className={`rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold ${fontSize}`}
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}
