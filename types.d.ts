type Meta = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  type: string;
  language: string;
  featureImage: string;
  excerpt: string;
  embeddedImagesRemote: string;
  videoSourceURL: string;
  videoTitle: string;
  github: string;
  npmorg: string;
  demo: string;
};

type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
