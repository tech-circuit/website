import { useEffect, useState } from "react";
import ForumCard from "../utility/ProfileForumCard";
import BASE_API_URL from "../../constants";

const Posts = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const postDataJson = await fetch(
                `${BASE_API_URL}/forum/profile/${userId}`
            );

            const postData = await postDataJson.json();
            console.log(postData);

            setPosts(postData.posts);
        };

        getData();
    }, [userId]);

    return (
        <div className="profile-forum-hold">
            {posts.map((post) => (
                <ForumCard post={post} />
            ))}
        </div>
    );
};

export default Posts;
