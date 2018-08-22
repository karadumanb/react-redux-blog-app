import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

    renderField(field) {
        return (
            <div className="form-group">
            <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
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
})(PostsNew);