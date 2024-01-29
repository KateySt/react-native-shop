export interface SideDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  status: (isChecked: boolean) => void;
  navigation: any;
}
