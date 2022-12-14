import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const Axis = ({
  type,
  scale,
  ticks,
  transform,
  tickFormat,
  disableAnimation,
  ...props
}) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const axisGenerator = type === "left" ? d3.axisLeft : d3.axisBottom;
    const axis = axisGenerator(scale).ticks(ticks).tickFormat(tickFormat);
    const axisGroup = d3.select(ref.current);
    if (disableAnimation) {
      axisGroup.call(axis);
    } else {
      axisGroup.transition().duration(750).ease(d3.easeLinear).call(axis);
    }
    axisGroup.select(".domain").remove();
    axisGroup.selectAll("line").remove();
    axisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem");
  }, [scale, ticks, tickFormat, disableAnimation]);

  return <g ref={ref} transform={transform} {...props} />;
};

Axis.propTypes = {
  type: PropTypes.oneOf(["left", "bottom"]).isRequired
};

export default Axis;
