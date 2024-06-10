import "./CustomToolbar.scss";

const CustomToolbar = () => {
  return (
    <div>
      <div id="toolbar">
        <span>
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote" />
        </span>
        <span>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span>
          <button className="ql-align" value=""></button>
          <button className="ql-align" value="center"></button>
          <button className="ql-align" value="right"></button>
        </span>
        <span>
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>
        <span>
          <button className="ql-link" />
          <button className="ql-image" />
        </span>
      </div>
    </div>
  );
};

export default CustomToolbar;
