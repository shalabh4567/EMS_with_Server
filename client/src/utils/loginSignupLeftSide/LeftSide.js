import React from "react";
import "./LeftSide.css"

const LeftSide = () => {
  return (
    <div className="left-view">
      <div className="left-view-inner">
        <div className="circle-horizontalLine">
          <i className="fa-solid fa-quote-left"></i>
        </div>
        <div className="left-view-heading">
          <div className="horizontal-line-div">
            <div className="horizontal-line"></div>
          </div>
          <div className="heading-div">
            <h6>Turning Imaginations to reality.</h6>
          </div>
          <div className="heading-paragraph">
            <h6>
              “Lörem ipsum neling mot utan gigapyskapet. Harar deledes, på
              epitöska preheten. Doll selingar. Matsv innsbutik monönde i berel
              ing de göbepp och ologi. Åbev kasamma i euras gisk. sbu tikm
              onönde i ber eling de gö be pp och dologi.”
            </h6>
          </div>
          <div className="author">
            <div className="author-dashed-main">
              <div className="author-dashed"></div>
            </div>
            <div className="author-name">
              <h5>Lörem ipsum neling</h5>
              <h6>berem ipsum göbepp och</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
