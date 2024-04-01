const ACircle17 = ({ handleFill, fillColor, circleIndex, color }) => {
  return (
    <div>
      <div className="Acircle">
        <div
          className="rightSide"
          style={{ backgroundColor: fillColor.colorRight }}
          onClick={() => handleFill(circleIndex, "colorRight", color)}
        ></div>
        <div
          className="leftSide"
          style={{ backgroundColor: fillColor.colorLeft }}
          onClick={() => handleFill(circleIndex, "colorLeft", color)}
        ></div>
        <div
          className="bottom"
          style={{ backgroundColor: fillColor.colorBottom }}
          onClick={() => handleFill(circleIndex, "colorBottom", color)}
        ></div>
        <div
          className="top"
          style={{ backgroundColor: fillColor.colorTop }}
          onClick={() => handleFill(circleIndex, "colorTop", color)}
        ></div>
        <div
          className="donut-hole"
          style={{ backgroundColor: fillColor.donut_hole }}
          onClick={() => handleFill(circleIndex, "donut_hole", color)}
        ></div>
      </div>
    </div>
  );
};

export default ACircle17;
