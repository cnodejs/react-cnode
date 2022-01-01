declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  initialState: InitialState;
}

interface InitialState {
  user?: UserModel;
  token?: string;
}

interface UserModel {
  id: string;
  loginname: string;
  avatar_url: string;
}

interface QiankunApp {
  name: string;
  type: string;
  path: string;
  entry: string;
  order: number;
  remark?: string;
  locale?: string;
}

interface ReplyModel {
  id: string;
  content: string;

  author: {
    loginname: string;
    avatar_url: string;
  };

  ups: string[];
  create_at: Date;
  reply_id?: string;
  is_uped: boolean;
}
