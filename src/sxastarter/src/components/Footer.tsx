import { ImageField, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FooterProps = ComponentProps & {
  fields: {
    footerimg: ImageField;
  };
};
const Footer = (props: FooterProps): JSX.Element => {
  return (
    <div className="footer">
      <div className="newsletter">
        <h2>KEEP ME UPDATED</h2>
        <p>Stay Up To date with the latest Hubolt news</p>
        <a className="open-button">Sign Up</a>
      </div>
      <div className="footerlogo">
        <Image field={props.fields.footerimg} />
      </div>
      <div className="footernav">
        <nav>
          <a href="">Newsletter</a>
          <a href="">Career</a>
          <a href="">Support</a>
          <a href="">About Us</a>
          <a href="">Hublot Worldwide</a>
          <a href="">Terms Of Use</a>
          <a href="">Trademarks</a>
          <a href="">Accessibility</a>
        </nav>
        <nav>
          <a href="">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="">
            <i className="fa fa-github"></i>
          </a>
          <a href="">
            <i className="fa fa-whatsapp"></i>
          </a>
          <a href="">
            <i className="fa fa-youtube"></i>
          </a>
        </nav>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<FooterProps>(Footer);