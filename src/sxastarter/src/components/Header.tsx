import {
  LinkField,
  withDatasourceCheck,
  Field,
  //Image,
  //ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type NavigationLink = {
  link: {
    field: LinkField;
  };
  text: {
    field: Field<string>;
  };
};

interface Fields {
  data: {
    datasource: {
      headerimage: {
        field: {
          value: {
            src: string;
          };
        };
      };
      children: {
        results: NavigationLink[];
      };
    };
  };
}

type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

type LinkListItemProps = {
  link: LinkField;
  text: Field<string>;
};

const LinkListItem = (props: LinkListItemProps) => {
  return <a href={`${props.link.value.href}`}>{props.text.value}</a>;
};

const Header = (props: HeaderProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;

  if (datasource) {
    const list = datasource.children.results.map((element: NavigationLink, key: number) => (
      <LinkListItem
        key={`${key}${element.link.field}`}
        link={element.link.field}
        text={element.text.field}
      />
    ));
    const headerImage = datasource.headerimage.field.value.src;
    return (
      <div>
        <div className="header">
          <div className="headerimg">
            <a href="/">
              <img alt="" src={headerImage?.replace('http://cm/', '')}></img>
            </a>
          </div>
          <div className="headernav">
            <nav>{list}</nav>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="component-content">
        <h3>Header</h3>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<HeaderProps>(Header);
