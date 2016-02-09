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

        if (this.props.category) {
            posts = _.filter(posts, (post) => {
                return post.categories == this.props.category;
            })
        }

        if (typeof posts == 'undefined' || posts.length == 0) {
            return <div>Loading...</div>;
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

    onCategoriesClick(event) {
        this.props.selectCategory(event);
    }

    renderCategories() {
        var categories = _.map(this.props.posts, (post) => { return post.categories });
        categories = _.uniq(categories, true);

        if (typeof categories == 'undefined' || categories.length == 0) {
            return <div>Loading...</div>;
        }

        return categories.map((category) => {
            return (
                <li className="list-group-item" key={category}>
                    <a href="#" onClick={ () => {this.onCategoriesClick(category)} }>
                        {category}
                    </a>
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
                            <li className="list-group-item">
                                <a href="#" onClick={() => {this.onCategoriesClick(null)}}>ALL</a>
                            </li>
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
