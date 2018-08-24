import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`
        return (
            <div className={className}>
            <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Past Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const err = {};

    if(!values.title || values.title.length === 0) {
        err.title = 'Enter a title'
    }
    if(!values.categories) {
        err.categories = 'Enter some categories'
    }
    if(!values.content) {
        err.content = 'Enter some contents'
    }

    return err;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost}) (PostsNew)
);