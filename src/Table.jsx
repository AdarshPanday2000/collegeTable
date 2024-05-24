import React, { useState, useEffect, useCallback } from 'react';
import collegesData from './collegesData.json'; 

const Table = () => {
  const [colleges, setColleges] = useState([]);  // stores complete list
  const [currentColleges, setCurrentColleges] = useState([]);  // stores currently displayed
  const [searchTerm, setSearchTerm] = useState(''); // for searching

  useEffect(() => {
    setColleges(collegesData)
    setCurrentColleges(collegesData.slice(0,10));
  }, [])
//console.log(colleges)

  // search functionality
  function handleSearch(e){
    setSearchTerm(e.target.value)
    const filteredColleges = colleges.filter((clg) => {
      return clg.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setCurrentColleges(filteredColleges.slice(0,10))
  }

  // sorting functionality
  function handleSort(key, direction = 'ascending'){
    const sortedColleges = [...colleges].sort((a, b) => {
      if (Number(a[key]) < Number(b[key])) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (Number(a[key]) > Number(b[key])) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setCurrentColleges(sortedColleges.slice(0, 20));
  }

  // for fee
  const handleFeeChange = (e) => {
    const direction = e.target.value;
    handleSort('fees', direction);
  };

  // for rank
  function handleRankChange(e){
    const direction = e.target.value;
    handleSort('rank', direction)
  }
  // for rating
  function handleRateChange(e){
    const direction = e.target.value;
    handleSort('collegeDuniyaRating', direction)
  }
  // for user rating
  function handleUserRateChange(e){
    const direction = e.target.value;
    handleSort('userReview', direction)
  }

  // for infinite scrolling
  const loadMoreColleges = useCallback(() => {
    const moreColleges = colleges.slice(currentColleges.length , currentColleges.length+10) 
    setCurrentColleges((prev) => [...prev, ...moreColleges]);  //adds the next 10 colleges to list
  }, [colleges, currentColleges.length])

  useEffect(() => {
    function handleScroll (){
      if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
        loadMoreColleges()
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); //cleanup
  }, [loadMoreColleges])


  return (
    <div className='container mx-auto p-4'>
      <div className='flex mt-5'>
        <input type='text' onChange={handleSearch} value={searchTerm} placeholder='Search by college name' className="p-2 border border-gray-400 flex-grow"/>
        
        <select onChange={handleFeeChange} className="p-2 border border-gray-400 hover:bg-gray-200">
          <option value="ascending">Fees: Low to High</option>
          <option value="descending">Fees: High to Low</option>
        </select>

        <select onChange={handleRankChange} className="p-2 border border-gray-400 hover:bg-gray-200 ">
          <option value="ascending">Rank: Low to High</option>
          <option value="descending">Rank: High to Low</option>
        </select>

        <select onChange={handleRateChange} className="p-2 border border-gray-400 hover:bg-gray-200">
          <option value="ascending">CD Rating: Low to High</option>
          <option value="descending">CD Rating: High to Low</option>
        </select>

        <select onChange={handleUserRateChange} className="p-2 border border-gray-400 hover:bg-gray-200">
          <option value="ascending">User rating: Low to High</option>
          <option value="descending">User rating: High to Low</option>
        </select>
        
      </div>

      <table className="min-w-full bg-white">

        <thead className="bg-gray-700 text-white">
          <tr>
            <th className='w-1/8 p-4'>Rank</th>
            <th className='w-1/4 p-4'>Name</th>
            <th className='w-1/8 p-4'>Fees</th>
            <th className='w-1/8 p-4'>College Duniya rating</th>
            <th className='w-1/8 p-4'>User rating</th>
            <th className='w-1/8 p-4'>Location</th>
          </tr>
        </thead>

        <tbody>
          {currentColleges.map((college) => (
            <tr key={college.id} className= {`bg-gray-100 border-b h-20 ${college.featured ? 'bg-blue-100' : ''}`} >
              <td className='p-4 text-center'>{college.rank}</td>
              <td className='p-4 text-center font-semibold'>
                {college.name}
                {college.featured && <div className='text-blue-500 font-normal'>Featured</div>}
              </td>
              <td className='p-4 text-center'>{college.fees}</td>
              <td className='p-4 text-center'>{college.collegeDuniyaRating}</td>
              <td className='p-4 text-center'>{college.userReview}</td>
              <td className='p-4 text-center'>{college.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
  
};

export default Table
