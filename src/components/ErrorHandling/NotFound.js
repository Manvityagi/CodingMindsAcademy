import React from "react";
import * as nums from "../web";

class NotFound extends React.Component {
  purl = nums.default.purl;
  render() {
    console.log(this.purl);

    return <h2>NOT FOUND!!!</h2>;
  }
}

export default NotFound;
