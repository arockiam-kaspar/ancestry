import React, { Component } from 'react';
import PropTypes from "prop-types";
import Validator from 'validator';
import { Button, Container, Form, Label, FormGroup, Input, FormFeedback, Alert } from 'reactstrap';
import countries from  '../../data/countries.json';
import "../../styles/signup.css";

class SignupForm extends Component {
  state = {
    data:{
      firstname:'',
      lastname: '',
      username: '',
      gender:'',
      country:'Afghanistan',
      email:'',
      password:'',
    },
    errors:{}
  };
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};

    const inputAll = Object.keys(data);
    for (let i = 0; i < inputAll.length; i += 1) {
      const field = inputAll[i];
      if (!data[field]) errors[field] = "Can't be blank";
    }
    if (!Validator.isEmpty(data.email)) {
      if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    }
    return errors;
  };
  render() {
    const { data, errors } = this.state;
    
    return (
      <section className="singup-container">
        <Container>
        {errors.global && <Alert color="danger">{errors.global}</Alert>}  
          <Form className="form-wrapper" onSubmit={this.onSubmit}>
            <FormGroup>
                <Input 
                  type="text" 
                  name="firstname" 
                  id="firstname" 
                  bsSize="lg" 
                  placeholder="First Name"
                  value={data.firstname}
                  onChange={this.onChange}
                  invalid={!!errors.firstname}
                />
                <FormFeedback>{errors.firstname}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input 
                  type="text" 
                  name="lastname" 
                  id="lastname" 
                  bsSize="lg" 
                  placeholder="Last Name"
                  value={data.lastname}
                  onChange={this.onChange}
                  invalid={!!errors.lastname}
                />
                <FormFeedback>{errors.lastname}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  bsSize="lg" 
                  placeholder="UserName"
                  value={data.username}
                  onChange={this.onChange}
                  invalid={!!errors.username}
                />
                <FormFeedback>{errors.username}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                bsSize="lg" 
                placeholder="Email Address" 
                value={data.email}
                onChange={this.onChange}
                invalid={!!errors.email}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  bsSize="lg" 
                  placeholder="Password" 
                  value={data.password}
                  onChange={this.onChange}
                  invalid={!!errors.password}
                />
                <FormFeedback>{errors.password}</FormFeedback>
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Gender</legend>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="gender" value='male' onChange={this.onChange}/>
                  Male
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" value='female' name="gender"  onChange={this.onChange}/>
                  Female
                </Label>
              </FormGroup>
              <FormFeedback>{errors.gender}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input type="select" name="country" id="country" onChange={this.onChange} value={data.country.name}>
              {countries.map((country, idx) =>(
                <option key={country.code}>
                {country.name}</option>
              ))}
              </Input>
          </FormGroup>
            <FormGroup>
              <Button color="success" size="lg" block >Submit</Button>
            </FormGroup>  
          </Form>
        </Container>
      </section>
    )
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;