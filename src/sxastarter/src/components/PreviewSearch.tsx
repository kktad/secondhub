import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import PreviewSearchComponent from 'src/search/PreviewSearchComponent';


type PreviewSearchProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const PreviewSearch = (props: PreviewSearchProps): JSX.Element => (
  
  <div>   
    <PreviewSearchComponent/>
  </div>
);

export default withDatasourceCheck()<PreviewSearchProps>(PreviewSearch);
