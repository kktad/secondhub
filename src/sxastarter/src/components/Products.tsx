import { ImageField, Field, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Product = {
  url: string,
  fields: {
    Model: Field<string>;
    Title: Field<string>;
    Image: ImageField;
    Price: Field<string>;
  };
};
type ProductsProps = ComponentProps & {
  fields: {
    ProductsList: Product[];
  };
};

function Products(props: ProductsProps): JSX.Element {
  return (
    <div className="allproducts">
      {props.fields.ProductsList.map((listitem, index) => (
        <a key={null} href={`${listitem.url}`}>
          <article key={index} className="product">
            <div className="productimage">
              <Image field={listitem.fields.Image} />
            </div>
            <div>
              <h3>{listitem.fields.Title.value}</h3>
              <p>INR {listitem.fields.Price.value}</p>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}

export default withDatasourceCheck()<ProductsProps>(Products);