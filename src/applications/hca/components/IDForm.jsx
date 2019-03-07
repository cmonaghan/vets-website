import React from 'react';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';

import SchemaForm from 'platform/forms-system/src/js/components/SchemaForm';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import ssnUI from 'platform/forms-system/src/js/definitions/ssn';
import constants from 'vets-json-schema/dist/constants.json';

import { genderLabels } from 'platform/static-data/labels';
import LoadingButton from 'platform/site-wide/loading-button/LoadingButton';

export default class IDForm extends React.Component {
  state = {
    idFormData: {},
  };

  formChange = formData => {
    this.setState({ idFormData: formData });
  };

  formSubmit = ({ formData }) => {
    this.props.handleSubmit(formData);
  };

  schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      dob: {
        type: 'string',
        format: 'date',
      },
      ssn: {
        type: 'string',
      },
      gender: {
        type: 'string',
        enum: [...constants.genders.map(option => option.value), 'NA'],
      },
    },
    required: ['firstName', 'lastName', 'dob', 'ssn'],
  };

  uiSchema = {
    firstName: {
      'ui:title': 'First name',
      'ui:errorMessages': {
        required: 'Please enter your first name.',
      },
    },
    lastName: {
      'ui:title': 'Last name',
      'ui:errorMessages': {
        required: 'Please enter your last name.',
      },
    },
    dob: {
      ...currentOrPastDateUI('Date of birth'),
      'ui:errorMessages': {
        required:
          'Please provide your date of birth. Select the month and day, then enter your birth year.',
      },
    },
    ssn: {
      ...ssnUI,
      'ui:errorMessages': {
        required:
          'Please enter your Social Security number in this format: XXX-XX-XXXX.',
        // NOTE: this `pattern` message is ignored because the pattern
        // validation error message is hard coded in the validation function:
        // https://github.com/usds/us-forms-system/blob/db029cb4f18362870d420e3eee5b71be98004e5e/src/js/validation.js#L231
        pattern:
          'Please enter your Social Security number in this format: XXX-XX-XXXX.',
      },
    },
    gender: {
      'ui:title': 'Gender',
      'ui:labels': genderLabels,
    },
  };

  renderContinueButtonOrStatus = () => {
    const { enrollmentStatus } = this.props;
    if (enrollmentStatus && enrollmentStatus !== 'none_of_the_above') {
      return (
        <React.Fragment>
          <AlertBox
            isVisible
            status="error"
            headline="Please sign in to continue your application"
            content={
              <React.Fragment>
                <p>
                  We’re sorry for the interruption, but we need you to review
                  some information before you continue applying. Please sign in
                  below to review. If you don’t have an account, you can create
                  one now.
                </p>
                <button
                  className="usa-button-primary"
                  onClick={this.props.handleSignIn}
                >
                  Sign in to VA.gov
                </button>
              </React.Fragment>
            }
          />
          <br />
        </React.Fragment>
      );
    }

    return (
      <LoadingButton
        isLoading={this.props.isLoading}
        disabled={false}
        type="submit"
        /* to override the `width: 100%` given to SchemaForm submit buttons */
        style={{ width: 'auto' }}
      >
        Continue to the Application
        <span className="button-icon">&nbsp;»</span>
      </LoadingButton>
    );
  };

  render() {
    return (
      <SchemaForm
        // `name` and `title` are required by SchemaForm, but are only used
        // internally in the component
        name="ID Form"
        title="ID Form"
        schema={this.schema}
        uiSchema={this.uiSchema}
        onSubmit={this.formSubmit}
        onChange={this.formChange}
        data={this.state.idFormData}
      >
        {this.renderContinueButtonOrStatus()}
      </SchemaForm>
    );
  }
}
