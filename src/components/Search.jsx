import React, { useState } from "react";
import Submit from "./Submit";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
Search.propTypes = {
	onClick: PropTypes.func,
};

function Search({ onClick }) {
	const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
	const handleChange = e => {
		setKeyword(e.target.value);
    setSearchParams(keyword);
	};

	return (
		<>
			<form>
				<input className="dark:bg-gray-600 focus:bg-gray-400 rounded-lg w-32 h-8  box-border border-1 p-3" type="text" name="" id="" autoFocus value={keyword} onChange={handleChange} />
				<Submit
					onClick={e => {
						e.preventDefault();
						onClick(keyword);
					}}
				>
					검색
				</Submit>
			</form>
		</>
	);
}

export default Search;
