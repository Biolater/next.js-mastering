export const getPost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        cache: "force-cache",
        next: {
            revalidate: 60
        }
    });
    if(res.status === 404) {
        return {
            success: false,
            data: null,
            error: "Post not found",
            status: res.status,
        }
    }
    if(!res.ok) {
        return {
            success: false,
            data: null,
            error: "Failed to fetch post",
            status: res.status,
        }
    }
    const data = await res.json().catch((err) => {
        console.error("Error fetching post:", err);
        return null;
    });
    if (!data) {
        return {
            success: false,
            data: null,
            error: "Failed to parse post",
        }
    }
    return {
        success: true,
        data,
    }
}