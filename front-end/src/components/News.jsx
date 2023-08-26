import React , {useState, useEffect} from 'react'
import axios from "axios";
function News({changenews}) {
    const [news, setnews] = useState([]);

    useEffect(() => {
      // Use an async function to fetch data and update state
      async function fetchData() {
        try {
          const response = await axios.get('https://api.whowhatwear.com/articles/serve/metadata?limit=10&offset=16&site_id=1&section=fashion-news&exclude_ids='); // Corrected URL
          setnews(response.data.items); // Update the state with fetched data
          console.log(response.data.items); // Log the fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
      fetchData(); // Call the async function
    }, []);
  return (
    <div className='news-feed'>
      
      {news.map((ne,i)=>(
        <div className='new-whole' key={i}>
        <p className='new-title'>{ne.title}</p>
        <img className='new-pic' src={ne.images.fb.url}/>
        <div className="publisher-line">
      <hr className="line" />
      <span className="publisher">Published by {ne.authors[0].full_name}</span>
    </div>
        </div>
      ))}
      
    </div>
)
}

export default News
