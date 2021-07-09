import React from "react";
import { Badge, Button } from "reactstrap";

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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Badge color="light">
          {("0" + Math.floor((props.Time / 1000) % 60)).slice(-2)}
        </Badge>
        &nbsp;&nbsp;
        {props.timeron && (
          <Button color="danger" onClick={() => props.setTimeron(false)}>
            Stop
          </Button>
        )}
        {!props.timeron && props.Time > 0 && (
          <Button color="success" onClick={() => props.setTimeron(true)}>
            Resume
          </Button>
        )}
      </h3>
    </div>
  );
};

export default CwMatBadge;
