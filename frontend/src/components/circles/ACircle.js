import { useState, useEffect } from "react";

const ACircle = ({
  handleFill,
  fillColor,
  circleIndex,
  color,
  defaultColor,
  setFillColor,
}) => {
  const [colors, setColors] = useState(defaultColor);

  // useEffect(() => {
  //   //NOTE: iwasan mabura lahat ng color
  //   setColors(fillColor);
  // }, [fillColor]);

  useEffect(() => {
    setFillColor((prevState) => ({
      ...prevState,
      [circleIndex]: {
        colorRight: colors?.colorRight,
        colorLeft: colors?.colorLeft,
        colorBottom: colors?.colorBottom,
        colorTop: colors?.colorTop,
        donut_hole: colors?.donut_hole,
      },
    }));

    setColors(defaultColor);
  }, [defaultColor]);

  useEffect(() => {
    setColors({
      colorRight: fillColor?.colorRight,
      colorLeft: colors?.colorLeft,
      colorBottom: colors?.colorBottom,
      colorTop: colors?.colorTop,
      donut_hole: colors?.donut_hole,
    });
  }, [fillColor.colorRight]);

  useEffect(() => {
    setColors({
      colorRight: colors?.colorRight,
      colorLeft: fillColor?.colorLeft,
      colorBottom: colors?.colorBottom,
      colorTop: colors?.colorTop,
      donut_hole: colors?.donut_hole,
    });
  }, [fillColor.colorLeft]);

  useEffect(() => {
    setColors({
      colorRight: colors?.colorRight,
      colorLeft: colors?.colorLeft,
      colorBottom: fillColor?.colorBottom,
      colorTop: colors?.colorTop,
      donut_hole: colors?.donut_hole,
    });
  }, [fillColor.colorBottom]);

  useEffect(() => {
    setColors({
      colorRight: colors?.colorRight,
      colorLeft: colors?.colorLeft,
      colorBottom: colors?.colorBottom,
      colorTop: fillColor?.colorTop,
      donut_hole: colors?.donut_hole,
    });
  }, [fillColor.colorTop]);

  useEffect(() => {
    setColors({
      colorRight: colors?.colorRight,
      colorLeft: colors?.colorLeft,
      colorBottom: colors?.colorBottom,
      colorTop: colors?.colorTop,
      donut_hole: fillColor?.donut_hole,
    });
  }, [fillColor.donut_hole]);

  return (
    <div>
      <div className="Acircle">
        <div
          className="rightSide"
          style={{ backgroundColor: colors?.colorRight }}
          onClick={() => handleFill(circleIndex, "colorRight", color)}
        ></div>
        <div
          className="leftSide"
          style={{ backgroundColor: colors?.colorLeft }}
          onClick={() => handleFill(circleIndex, "colorLeft", color)}
        ></div>
        <div
          className="bottom"
          style={{ backgroundColor: colors?.colorBottom }}
          onClick={() => handleFill(circleIndex, "colorBottom", color)}
        ></div>
        <div
          className="top"
          style={{ backgroundColor: colors?.colorTop }}
          onClick={() => handleFill(circleIndex, "colorTop", color)}
        ></div>
        <div
          className="donut-hole"
          style={{ backgroundColor: colors?.donut_hole }}
          onClick={() => handleFill(circleIndex, "donut_hole", color)}
        ></div>
      </div>
    </div>
  );
};

export default ACircle;
