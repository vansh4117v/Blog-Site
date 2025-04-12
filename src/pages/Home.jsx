import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const userStatus  = useSelector((state) => state.auth.status)
	useEffect(() => {
		appwriteService.getPosts().then((posts) => {
			if (posts) {
				setPosts(posts.documents);
			}
		});
	}, []);
	if (posts.length === 0) {
		return (
			<div className="h-full absolute inset-0 flex justify-center items-center text-2xl font-bold ">
				{userStatus?"No Posts Yet!": "Please Login to see posts!"}
			</div>
		);
	} else {
		return (
			<div className="w-full py-8">
				<Container>
					<div className="flex flex-wrap">
						{posts?.map((post) => (
							<div key={post.$id} className="p-2 w-1/4">
								<PostCard {...post} />
							</div>
						))}
					</div>
				</Container>
			</div>
		);
	}
};

export default Home;
