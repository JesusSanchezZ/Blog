import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'delete_blogspost':
            return state.filter( blogPost => blogPost.id !== action.payload );
        case 'add_blogspost':
            return [
                ...state, 
                { 
                    id: Math.floor(Math.random() * 99999), 
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogspost', payload: { title, content} });
        callback();
    };
};

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogspost', payload: id });
    };
};


export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost },
    [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1 }]
);
// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogspost' });
//     };

//     return <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
//         {children}
//     </BlogContext.Provider>
// };

// export default BlogContext;