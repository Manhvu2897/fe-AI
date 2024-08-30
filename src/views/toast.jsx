const Toast = ({ icon, title, message, background, checked }) => {
  return (
    <div
      className={`${checked ? "roboto_regular" : "font_pixel"} toast-css`}
      style={{ background: background }}
    >
      {!checked && <div className="toast-icon">{icon}</div>}
      <div>
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
