export interface SearchBarProps {
  text: (term: string) => void;
  status: (term: boolean) => void;
  navigation: any;
}
