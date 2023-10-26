"use client";

import React from "react";

interface IframeProps {
  src: string;
}
export default function page({ src }: IframeProps) {
  // const [src1, setSrc1] = useState<string>();

  // useEffect(() => {
  //   setSrc1(src);
  // }, [src]);
  return (
    <div>
      <iframe
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="no"
        src={src}
      >
        frame
      </iframe>
    </div>
  );
}
