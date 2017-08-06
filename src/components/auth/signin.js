import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions'


class Signin extends Component {
    renderField = ({ input, label, type }) => {
        return (
            <fieldset className="form-group">
                <label>{label}</label>
                <input {...input } name={name} type={type}
                    className="form-control" />
            </fieldset>
        )

    }

    handleFormSubmit = ({ email, password }) => {
        // console.log(email, password);
        // Need to do something to log user in
        this.props.signinUser({ email, password })
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Ooops!</strong> {this.props.errorMessage}
                </div>

            );
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
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    }
}

Signin = connect(mapStateToProps, actions)(Signin)

export default reduxForm({
    form: 'signin'
})(Signin);



