// importujemy funkcje z biblioteki web-vitals, które mierzą różne wskaźniki wydajności strony
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// funkcja reportWebVitals umożliwia zbieranie danych o wydajności aplikacji
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  // sprawdzamy, czy onPerfEntry została przekazana i jest funkcją
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // wywołujemy funkcje web-vitals, które zbierają dane o wydajności
    onCLS(onPerfEntry); // Cumulative Layout Shift - mierzy stabilność wizualną
    onFID(onPerfEntry); // First Input Delay - mierzy czas reakcji na pierwszą interakcję użytkownika
    onFCP(onPerfEntry); // First Contentful Paint - mierzy czas wyrenderowania pierwszej zawartości
    onLCP(onPerfEntry); // Largest Contentful Paint - mierzy czas wyrenderowania największego elementu
    onTTFB(onPerfEntry); // Time to First Byte - mierzy czas oczekiwania na pierwszą odpowiedź serwera
  }
};

// eksportujemy funkcję jako domyślny eksport modułu
export default reportWebVitals;