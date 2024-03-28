import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "@pages/board/ReplyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "@components/Spinner";
// import { useEffect, useState } from "react";

function ReplyList() {
	const axios = useCustomAxios();
	const { _id } = useParams();
	// const [searchParams, setSearchParams] = useSearchParams();

	// const [data, setData] = useState(null);

	// const fetchList = async () => {
	//   const res = await axios.get(`/posts/${ _id }/replies`, { params: { sort: JSON.stringify({ _id: -1 }) } });
	//   setData(res.data);
	// }

	// useEffect(() => {
	//   fetchList();
	// }, []);

	const { data, fetchNextPage } = useInfiniteQuery({
		// const { data } = useQuery({
		queryKey: ["posts", _id, "replies"],
		// queryFn: () => axios.get(`/posts/${_id}/replies?delay=1500`, { params: { page: 1, limit: 4, sort: JSON.stringify({ _id: -1 }) } }),
		queryFn: ({ pageParam = 1 }) => axios.get(`/posts/${_id}/replies?delay=1500`, { params: { page: pageParam, limit: import.meta.env.VITE_REPLY, sort: JSON.stringify({ _id: -1 }) } }),
		// select: response => response.data,
		getNextPageParam: (lastPage, allPages) => {
			console.log("lastPage", lastPage, "allPages", allPages);
			const totalPages = lastPage.data.pagination.totalPages;
			const nextPage = allPages.length < totalPages ? allPages.length + 1 : false;
			return nextPage;
		},
	});
	console.log("data?.pages", data);
	const list = data?.pages?.flatMap(page => page.data.item.map(item => <ReplyItem key={item._id} item={item} />));
	// const list = data?.pages?.flatMap(page => page.data.item.map(item => <ReplyItem key={item._id} item={item} />));
	console.log("list", list);
	// const list = data?.item.map(item => <ReplyItem key={item._id} item={item} />);
	const hasNext = data?.pages.at(-1).data.pagination.page < data?.pages.at(-1).data.pagination.totalPages;

	return (
		<section className="mb-8">
			<h4 className="mt-8 mb-4 ml-2">댓글 {list?.length || 0}개</h4>
			<InfiniteScroll pageStart={1} loadMore={fetchNextPage} hasMore={hasNext} loader={<div>로딩중
        <Spinner/>
      </div>}>
				{list || []}
			</InfiniteScroll>

			<ReplyNew />
		</section>
	);
}

export default ReplyList;
