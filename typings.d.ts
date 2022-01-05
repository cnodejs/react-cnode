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

interface QiankunApp {
  name: string;
  type: string;
  path: string;
  entry: string;
  order: number;
  remark?: string;
  locale?: string;
}

interface InitialState {
  user?: UserModel;
  token?: string;
}

interface UserModel extends AuthorModel {
  id: string;
  // loginname: string;
  // avatar_url: string;
}

interface TopicModel {
  id: string;
  author_id: string;

  tab: string;
  content: string;
  title: string;
  last_reply_at: Date;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: Date;

  author: AuthorModel;
  replies: ReplyModel[];
}

interface ReplyModel {
  id: string;
  author: AuthorModel;

  content: string;
  ups: string[];
  create_at: Date;
  reply_id?: string;
  is_uped: boolean;
}

interface AuthorModel {
  id?: string;
  loginname: string;
  avatar_url: string;
}

interface MessageModel {
  id: string;
  type: string;
  has_read: boolean;
  create_at: Date;

  author: AuthorModel;
  topic: TopicModel;
  reply: ReplyModel;
}
