import React from "react";

export default function Sidebar() {
  return (
    <div>
      {" "}
      <section>
        <div className="sideList">
          <h6>Other List</h6>
          <ul>
            {(location.state?.list || []).map((k, i) => {
              const slug = `/${urlarr[1]}/${k.slug}`;
              let current = "";
              if (urlarr[2] === k.slug) current = "selected";
              return (
                <li>
                  <Link
                    to={slug}
                    state={{ list: location.state.list }}
                    className={current}
                  >
                    {k.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          {sideItems.map((ah, i) => {
            return (
              <>
                <h6>{ah.title}</h6>
                <a href={ah.url} target="showsite" title={ah.url}>
                  {wcut(ah.url)}
                </a>
              </>
            );
          })}
          <h6>youtube</h6>
          {videoTitle &&
            videoTitle.split(";").map((title, j) => {
              return <a href={`#showyoutube_${j}`}>{title}</a>;
            })}
        </div>
      </section>
    </div>
  );
}
