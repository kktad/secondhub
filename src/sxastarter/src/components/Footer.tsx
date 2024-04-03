import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FooterItem = {
  link: string;
  text: string;
};

type FooterProps = ComponentProps & {
  fields: Fields;
};

interface Fields {
  footerimage: {
    url: string;
  };
  items: FooterItem[];
}

const FooterLink = (props: FooterItem) => {
  return <a href={`${props.link}`}>{props.text}</a>;
};

const Footer = (props: FooterProps): JSX.Element => {
  console.log(props.fields);
  const list = props.fields.items.map((element: FooterItem, key: number) => (
    <FooterLink key={`${key}${element.link}`} link={element.link} text={element.text} />
  ));
  const footerLogo = props.fields.footerimage.url;
  return (
    <div className="footer">
      <div className="newsletter">
        <h2>KEEP ME UPDATED</h2>
        <p>Stay Up To date with the latest Hubolt news</p>
        <a className="open-button">Sign Up</a>
      </div>
      <div className="footerlogo">
        <img
          alt=""
          src={footerLogo?.replace(
            '/Project',
            'https://edge.sitecorecloud.io/techaspects6f0c-hublot-dev-d8ea/media/Project'
          )}
        ></img>
      </div>
      <div className="footernav">
        <nav>{list}</nav>
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
