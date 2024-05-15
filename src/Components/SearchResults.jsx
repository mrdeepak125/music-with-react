import React from 'react';


const SearchResults = ({ data }) => {
    // Check if data is defined and an array before rendering
    if (!data || !Array.isArray(data)) {
        return <div>No results found</div>;
    }

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <ul>
                {data.map((result, index) => (
                    <li key={index}>
                        {/* Display image if available */}
                        {result.image && <img src={result.image} alt={result.title} />}
                        <div>
                            <h3>{result.title}</h3>
                            <p>Artists: {result.primary_artists.join(', ')}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;