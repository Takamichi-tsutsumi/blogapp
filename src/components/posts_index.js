/**
 * Created by Takamichi on 2/7/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts, selectCategory } from '../actions/index';
import _ from 'lodash';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        var posts = this.props.posts;
        console.log(this.props.category);
        if ('post') {
            posts = _.filter(posts, (post) => {
                if (post.categories == 'post') {
                    return post;
                }
            })
        }
        return posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={"posts/" + post.id}>
                        <span className="pull-xs-right">{post.categories}</span>
                        <strong>{post.title}</strong>
                    </Link>
                </li>
            );
        });
    }

    renderCategories() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.categories}>
                        {post.categories}
                </li>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-secondary">
                        Add a Post
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h3>Posts</h3>
                        <ul className="list-group">
                            { this.renderPosts() }
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4>Categories</h4>
                        <ul className="list-group">
                            { this.renderCategories() }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    "use strict";
    return { posts: state.posts.all, category: state.posts.category };
}

export default connect(mapStateToProps, { fetchPosts, selectCategory })(PostsIndex);
