import React, { Suspense, useEffect, useState } from 'react';
import { discoverAPI } from './Api/api';
import {
  MyValue,
  SitecoreResponseContent,
  SitecoreResponseFacets,
  SitecoreResponseSort,
  TypeItem,
} from './Interfaces/SitecoreResponseContent';
import { RequestPayload } from './payloads/RequestPayload';
import Pagination from './Common/Pagination';
import SearchComponent from './Common/SearchComponent';
import FacetComponent from './Common/FacetComponent';
import Sorting from './Common/Sorting';
import Loading from 'src/Loading';

interface MyComponentProps {
  keyword: string;
}
const SearchResultsComponent: React.FC<MyComponentProps> = ({ keyword }) => {
  const [data, setData] = useState<SitecoreResponseContent[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const [facets, setFacets] = useState<SitecoreResponseFacets[]>([]);
  const [filterPayload, setFilterPayload] = useState<TypeItem[]>([]);
  const [recordPerPage, setRecordPerPage] = useState<number>(
    Number(process.env.NEXT_PUBLIC_SEARCH_RESULTS_RECORD_LIMITS)
  );
  const [loading, setLoading] = useState(true);
  const [sortList, setSortList] = useState<SitecoreResponseSort[]>([]);
  const [selectedSort, setSelectedSort] = useState<MyValue[]>([]);

  const handleDataFromPagination = (page: number) => {
    setRecordPerPage(page);
  };
  const handleDataFromFacets = (filterPayload: TypeItem[]) => {
    setFilterPayload(filterPayload);
  };
  const handleDatafromPageClick = (currentPage: number) => {
    setCurrentPage(currentPage);
    const offsetValue: number =
      currentPage == 1 ? 0 : (Number(currentPage) - 1) * Number(recordPerPage);
    setOffset(offsetValue);
  };
  const handleDataFromSort = (sortPayload: MyValue[]) => {
    setSelectedSort(sortPayload);
  };
  useEffect(() => {
    (async () => {
      await getSearchResults();
    })();
  }, [keyword, filterPayload, recordPerPage, offset, selectedSort]);

  const getSearchResults = async () => {
    const payload = RequestPayload();
    payload.widget.items[0].search.limit = recordPerPage as any;
    payload.widget.items[0].search.offset = offset as any;
    payload.widget.items[0].rfk_id = 'rfkid_7';
    payload.widget.items[0].search.facet.all = true;
    if (keyword != '') {
      payload.widget.items[0].search.query.keyphrase = keyword as any;
    }

    if (filterPayload != null && filterPayload.length != 0) {
      payload.widget.items[0].search.facet.types = (filterPayload as any) ?? undefined;
    }
    if (selectedSort.toString() != '') {
      payload.widget.items[0].search.sort.value = selectedSort as any;
    }

    try {
      //console.log(JSON.stringify(payload))
      const response = await discoverAPI(payload);
      setTotalCount(response.total_item);
      const contentResponse: SitecoreResponseContent[] =
        response.content != undefined ? response.content : [];
      setData(contentResponse);
      const contentFacets: SitecoreResponseFacets[] =
        response.facet != undefined ? response.facet : [];
      setFacets(contentFacets);
      const contentSort: SitecoreResponseSort[] =
        response.sort != undefined ? response.sort.choices : [];
      setSortList(contentSort);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once the async operation is complete
    }
  };
  return (
    <>
      {loading ? (
        // Display a loading spinner or message while data is being fetched
        <div className="loader"></div>
      ) : (
        <>
          <section className="section-left">
            <FacetComponent facets={facets} onDataFromFacets={handleDataFromFacets} />
          </section>
          {totalCount ? (
            <section className="section-right">
              <section className="top-bar">
                <div>
                  {' '}
                  Showing {Number(offset) + 1} to {Number(recordPerPage) * Number(currentPage)} of{' '}
                  {totalCount} results
                </div>
                <Sorting sort={sortList} onDataFromSort={handleDataFromSort} />
              </section>
              <Suspense fallback={<Loading />}>
                <SearchComponent data={data} />
              </Suspense>
              <Pagination
                totalCount={totalCount}
                onDataFromPagination={handleDataFromPagination}
                onDataFromPageClick={handleDatafromPageClick}
              />
            </section>
          ) : (
            <div>No Result Found</div>
          )}
        </>
      )}
    </>
  );
};

export default SearchResultsComponent;
