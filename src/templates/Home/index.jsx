import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = !!searchValue
    ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  const noMorePosts = page + postsPerPage >= allPosts.length

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleInputChange = (event) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
  }

  return (
    <section className='container'>
      <div className="search-container">
        {!!searchValue && (
          <h1>Teste: {searchValue}</h1>
        )}

        <TextInput
          searchValue={searchValue}
          handleInputChange={handleInputChange}/>
      </div>

      {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Nenhum post encontrado.</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   };

//   async componentDidMount(){
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos
//     });
//   }

//   loadMorePosts = () => {
//     const {
//       posts,
//       allPosts,
//       page,
//       postsPerPage
//     } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   handleInputChange = (event) => {
//     const value = event.currentTarget.value;
//     this.setState({ ...this.state, searchValue: value });
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValue.toLowerCase()
//         );
//       })
//       : posts;

//     const noMorePosts = page + postsPerPage >= allPosts.length
    
//     return (
//       <section className='container'>
//         <div className="search-container">
//           {!!searchValue && (
//             <h1>Teste: {searchValue}</h1>
//           )}

//           <TextInput
//             searchValue={searchValue}
//             handleInputChange={this.handleInputChange}/>
//         </div>

//         {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Nenhum post encontrado.</p>}

//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }
