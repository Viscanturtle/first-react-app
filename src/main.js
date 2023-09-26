import data from './data.json';
import CardComp from './card';
import './main.css'

function Main() {
  return (
    <>
    <div id="container">
      {data.map(function (item) {
        return(
          <CardComp image={item.image_url} title={item.title} description={item.description} category={item.category}/>
        )
      }
      )
      }
      </div>
    </>
  )
}

export default Main;