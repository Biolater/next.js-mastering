export const posts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    content: `Content for post ${i + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}));



export const getPosts = async () => {
    return posts;
};

export const getPostById = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return posts.find(post => post.id === id);
}

