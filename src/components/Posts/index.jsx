import P from 'prop-types';

import './styles.css';

import { PostCard } from '../PostCard';

import React  from 'react';

export const Posts = ({ posts = [] }) => (
    <div className="posts">
        {posts.map((post) => (
            <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            cover={post.cover}
            />
        ))}
    </div>
);

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};