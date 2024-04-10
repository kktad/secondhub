import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import SearchResultsComponent from 'src/search/SearchResultsComponent';

type SearchResultsProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  return (
    <div className="results-container">
      {/* <h3><Text field={props.fields.heading} /></h3>  */}
      <div className="summarytxt">
        Showing results for <strong>{keyword} </strong>
      </div>
      <div className="search-results">
        {/* <Suspense fallback={<div className="loaderlocal">Loading</div>}>  */}
        <SearchResultsComponent keyword={keyword} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<SearchResultsProps>(SearchResults);
