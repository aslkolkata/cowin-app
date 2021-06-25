import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import moment from "moment";

const CwPinForm = (props) => {
  return (
    <div>
      <Form>
        <FormGroup row>
          <Label for="exampleEmail2" sm={2}>
            Enter Pincode:
          </Label>
          <Col sm={3}>
            <Input
              type="text"
              name="pincode"
              id="pincode"
              placeholder="enter your pincode"
              onChange={(e) => {
                props.handlesetPin(e.target.value);
              }}
            />
          </Col>
          <Label for="exampleDate" sm={1}>
            Date:{" "}
          </Label>
          <Col sm={3}>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              onChange={(e) =>
                props.handlesetDate(moment(e.target.value).format("DD-MM-YYYY"))
              }
            />
          </Col>
        </FormGroup>
      </Form>
      <Button
        color="info"
        onClick={(event) => {
          props.handlesetShow(true);
          props.handlesubmit(event);
        }}
      >
        OK
      </Button>{" "}
    </div>
  );
};

export default CwPinForm;
