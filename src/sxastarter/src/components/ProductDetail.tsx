import { Field, Image, ImageField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

function Product(): JSX.Element {
  const { sitecoreContext } = useSitecoreContext();
  const title = sitecoreContext?.route?.fields?.Title as Field<string>;
  const price = sitecoreContext?.route?.fields?.Price as Field<string>;
  const image = sitecoreContext?.route?.fields?.Image as ImageField;

  return (
    <div className="productData">
      <article className="productDatasetting">
        <div className="productContent">
          <h3>Big Bang</h3>
          <h1>{title.value}</h1>
          <p>INR {price.value}</p>
          <h6>49MM</h6>
        </div>
        <div className="productimage">
          <Image field={image} />
        </div>
      </article>
    </div>
  );
}

export default Product;
