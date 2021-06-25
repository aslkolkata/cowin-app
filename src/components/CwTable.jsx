import React from "react";
import { Table } from "reactstrap";

const CwTable = (props) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Center ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>From</th>
          <th>To</th>
          <th>Fee Type</th>
          <th>Fee</th>
          <th>Dose 1</th>
          <th>Dose 2</th>
          <th>Vaccine</th>
        </tr>
      </thead>
      <tbody>
        {props.vaccine_center.length
          ? props.vaccine_center.map((s) => (
              <tr>
                <td>{s["center_id"]}</td>
                <td>{s["name"]}</td>
                <td>{s["address"]}</td>
                <td>{s["from"]}</td>
                <td>{s["to"]}</td>
                <td>{s["fee_type"]}</td>
                <td>{s["fee"]}</td>
                <td>{s["available_capacity_dose1"]}</td>
                <td>{s["available_capacity_dose2"]}</td>
                <td>{s["vaccine"]}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
};

export default CwTable;
