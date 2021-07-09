import React from "react";
import { Badge } from "reactstrap";

const CwMatBadge = (props) => {
  return (
    <div>
      <h3>
        <Badge color="info">STATE : </Badge>{" "}
        <Badge color="light">{props.stateName}</Badge> &nbsp;&nbsp;&nbsp;&nbsp;
        <Badge color="info">District : </Badge>{" "}
        <Badge color="light">{props.districtName}</Badge>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Badge color="info">Total Center : </Badge>
        <Badge color="light">{props.centerCount}</Badge>
      </h3>
    </div>
  );
};

export default CwMatBadge;
