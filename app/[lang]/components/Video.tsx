import React from "react";
const Video = (meta: Meta) => {
  const urls = meta.videoSourceURL.split(";");
  const titles = meta.videoTitle.split(";");

  return urls.map((url, i) => {
    return (
      <div id={`showyoutube_${i}`} className="video">
        <div>
          <h5>{titles[i]}</h5>
        </div>
        <iframe
          src={url}
          title={titles[i]}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="1"
          allowFullScreen
        />
      </div>
    );
  });
};
export default Video;
