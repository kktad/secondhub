import {
    LinkField,
    withDatasourceCheck,
    ImageField,
    Image,
  } from '@sitecore-jss/sitecore-jss-nextjs';
  
  import { ComponentProps } from 'lib/component-props';
  type HeaderProps = ComponentProps & {
    fields: {
      headerimg: ImageField;
      buttonurl: LinkField;
    };
  };
  
  const Header = (props: HeaderProps): JSX.Element => (
    <div>
      <div className="header">
        <div className="headerimg">
          <Image field={props.fields.headerimg} />
        </div>
        <div className="headernav">
          <nav>
            <a href={`${props.fields.buttonurl.value}`}>WATCHES</a>
            <a href="">OUR WORLD</a>
            <a href="">BOUTIQUES</a>
          </nav>
        </div>
      </div>
    </div>
  );
  
  export default withDatasourceCheck()<HeaderProps>(Header);