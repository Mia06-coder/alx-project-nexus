// interfaces/Index.ts
export interface PillProps {
  text: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export interface CarouselProps {
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export interface Option {
  value: string;
  label: string;
}

// Base interface for shared props
interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FilterDrawerProps = ModalBaseProps;
export type ApplicationModalProps = ModalBaseProps;

export interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
}
