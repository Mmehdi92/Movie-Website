import React from 'react'
import FilterItem from './FilterItem'

export default function MovieFilter() {
  return (
    <div className='flex space-x-6  justify-center text-lg  bg-amber-100  lg:text-xl  font-medium dark:bg-gray-600 '>
        <FilterItem title="Popular"  param="fetchPopular"/>
        <FilterItem title="Top Rated"  param="fetchTopRated"/>
    </div>
  )
}
