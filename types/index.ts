

export interface ListMenu {
  id: number; 
  text: string; 
  icon: React.ReactNode; 
  childrenMenu?: ListMenu[];
}


export interface LoginReq {
  identify: string;
  password: string;
}

export interface LoginResp {
  loginStatus: string;
  error?: {
    message: string;
  };
}