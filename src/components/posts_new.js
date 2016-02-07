/**
 * Created by Takamichi on 2/7/16.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => { this.context.router.push('/') });
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${ form_alert(title) }`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        { title.touched ? title.error : '' }
                    </div>
                </div>
                <div className={`form-group ${ form_alert(categories) }`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        { categories.touched ? categories.error : '' }
                    </div>
                </div>
                <div className={`form-group ${ form_alert(content) }`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        { content.touched ? content.error : '' }
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    "use strict";
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title';
    }
    if (!values.categories) {
        errors.categories = 'Enter at least a category'
    }
    if (!values.content) {
        errors.content = 'Enter content'
    }
    return errors;
}

function form_alert(field) {
    "use strict";
    if (field.touched && field.invalid) {
        return 'has-danger';
    }
    return '';
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);