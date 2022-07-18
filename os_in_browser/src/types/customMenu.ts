export interface customMenu {
  title: string;
  iconPath: string;
  onClick: (e: MouseEvent) => void;
  props: any; // this is for onclick Argument
}
