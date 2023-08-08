type Meta = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  type: string;
  language: string;
  featureImage: string;
  excerpt: string;
};

type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
