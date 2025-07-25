
export interface UserInterface {
  id: string;
  username: string;
  email: string;
  fullname?: string;
}

export interface APIStatusResponseInterface {
  data: any;
  message: string;
  statusCode: number;
  success?: boolean;
}

export interface MessageInterface {
  id: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  chatId: string;
  senderId: string;
  sentiment?: string | null;
  sender: {
    id: string;
    username: string;
    email: string;
  };
}
