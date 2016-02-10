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
        categories = _.uniq(categories, false);

        if (typeof categories == 'undefined' || categories.length == 0) {
            return <div>Loading...</div>;
        }

        return categories.map((category) => {
            return (
                    <a href="#"
                       className={"list-group-item " + (category == this.props.category ? 'active' : '')}
                       onClick={ () => {this.onCategoriesClick(category)} }
                       key={category}>
                        {category}
                    </a>
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
                        <div className="list-group">
                            <a onClick={() => {this.onCategoriesClick(null)}}
                                className={"list-group-item " + (!this.props.category ? 'active' : '' )}>
                                ALL
                            </a>
                            { this.renderCategories() }
                        </div>
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
