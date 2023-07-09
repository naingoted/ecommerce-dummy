export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
  message?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface SuggestionProps {
  suggestion: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export interface SelectProps {
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
  renderSuggestion: (props: SuggestionProps) => JSX.Element;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}
