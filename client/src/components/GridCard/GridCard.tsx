import '../../styles/index.css'
import '../../styles/template.css'

function GridCard() {
  return (
    <>
      <div className="productCard">
        <a href="product-description.html?id=2">
          <img className="image" src="../images/id2-1.jpg"></img>
        </a>
        <div className="productDetails">
          <a className="productTitle" href="product-description.html?id=2">
            IV
          </a>
          <p className="productArtist">Led Zeppelin</p>
        </div>
        <p className="productPrice">177,-</p>
        <button className="cardButton btn btn-primary" id="liveAlertBtn">
          Add to Cart
        </button>
      </div>
    </>
  )
}

export default GridCard
