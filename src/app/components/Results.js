import React from 'react'

export default function Results({results}) {
  return (
  <div>
    {results.map((result)=>(
      <div key={result.id}>
        <h1>{result.title}</h1>
      </div>
    ))}
  </div>
  )
}
