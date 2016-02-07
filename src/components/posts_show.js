/**
 * Created by Takamichi on 2/8/16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchAPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchAPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => { this.context.router.push('/') });
    }

    render() {
        const { post } = this.props;

        if (!this.props.post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/" >Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <p>{ post.content }</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    "use strict";
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchAPost, deletePost })(PostsShow)
