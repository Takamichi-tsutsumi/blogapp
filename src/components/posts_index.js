/**
 * Created by Takamichi on 2/7/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-secondary">
                        Add a Post
                    </Link>
                </div>
                List of blog posts
            </div>
        );
    }
}

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators({ fetchPosts }, dispatch);
//}

export default connect(null, { fetchPosts })(PostsIndex);
