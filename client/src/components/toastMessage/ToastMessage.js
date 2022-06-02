import React from "react";
import Toast from "react-bootstrap/Toast";

const ToastMessage = (props) => {
  return (
    <Toast
      position="top-end"
      style={{
        position: "absolute",
        right: "10px",
        top: "10px",
        background: "yellow",
        zIndex: 100
      }}
      show={props.showToast}
      onClose={() => props.setShowToast(false)}
      delay={1000}
      autohide
    >
      <Toast.Header closeButton={false}>
        <strong className="me-auto" style={{ color: "black" }}>
          {props.message}
        </strong>
      </Toast.Header>
    </Toast>
  );
};

export default ToastMessage;
