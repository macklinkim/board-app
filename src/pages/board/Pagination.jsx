import React from 'react'
import { PropTypes } from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';
Pagination.propTypes = {
  totalPage:PropTypes.number,
  current:PropTypes.number,
}
function Pagination({totalPage=10, current=1}) {
  const pageList = [];
  const [searchParams] = useSearchParams();
  for(let page=1; page<=totalPage; page++){
    searchParams.set('page', page );
    searchParams.set('limit', 10 );
    let search = searchParams.toString();
    pageList.push(<li key={page} className=' text-blue-300 hover:text-blue-600'><Link to={`/boards?${search}`}>{page}</Link></li>)
  }
  return (
    <div className='flex justify-center'>
      <ul className='flex justify-center gap-2'>
        {pageList}
      </ul>
    </div>
  )
}

export default Pagination