import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardPage extends React.Component {

  render() {
    const { firstname } = this.props;
    return (
      <div>
        <h1>welcome {firstname} to Dashboard!</h1>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  firstname: PropTypes.string,
};

function mapStateToProps(state) {
  console.log("state", state);
  return {
    firstname: state.user.firstname,
  };
}

export default connect(mapStateToProps, null)(DashboardPage);