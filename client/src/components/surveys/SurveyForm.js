import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title', noValueError: 'Must provide a survey title' },
    { label: 'Subject Line', name: 'subject', noValueError: 'Must provide a survey subject' },
    { label: 'Email Body', name: 'body', noValueError: 'Must provide an email body' },
    { label: 'Recipient List', name: 'emails', noValueError: 'Must provide a recipient list' }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name}) => {
            return (
                <Field
                    key={name}
                    component={SurveyField} 
                    type="text"
                    label={label}
                    name={name}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({ name, noValueError }) => {
        if(!values[name]) {
            errors[name] = noValueError;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);