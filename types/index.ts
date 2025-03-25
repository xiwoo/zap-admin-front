

export interface ListMenu {
  id: number; 
  text: string; 
  icon: React.ReactNode; 
  childrenMenu?: ListMenu[];
}