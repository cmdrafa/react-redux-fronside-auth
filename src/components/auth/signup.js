import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <fieldset className="form-group">
                <label>{label}</label>
                <input {...input} name={name} type={type}
                    className="form-control" />
                {touched && error && <span className="error">{error}</span>}
            </fieldset>
        )
    }

    handleFormSubmit = (formProps) => {
        this.props.signupUser(formProps)
        //console.log(formProps)

    }

    renderAlert() {
        if (this.props.errorMessage) {
            console.log("inside render alert")
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                    label="Email"
                    type="text"
                    name="email"
                    component={this.renderField}
                />
                <Field
                    label="Password"
                    type="password"
                    name="password"
                    component={this.renderField}
                />
                <Field
                    label="Confirm password"
                    type="password"
                    name="passwordConfirm"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }

}

const validate = (formProps) => {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    }
}

Signup = connect(mapStateToProps, actions)(Signup)

export default reduxForm({
    form: 'signup',
    validate
})(Signup)

