import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

export function getRiskGrade(score: number): 'safe' | 'moderate' | 'danger' {
  if (score <= 30) return 'safe';
  if (score <= 70) return 'moderate';
  return 'danger';
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'safe':
      return 'text-green-600 bg-green-100';
    case 'moderate':
      return 'text-yellow-600 bg-yellow-100';
    case 'danger':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getGradeText(grade: string): string {
  switch (grade) {
    case 'safe':
      return '안전';
    case 'moderate':
      return '보통';
    case 'danger':
      return '위험';
    default:
      return '알 수 없음';
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
