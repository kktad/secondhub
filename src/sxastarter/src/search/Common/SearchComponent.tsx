import React from 'react';
import { SitecoreResponseContent } from '../Interfaces/SitecoreResponseContent';
import Link from 'next/link';
import Image from 'next/image';

interface ChildProps {
  data: SitecoreResponseContent[];
}
const SearchComponent: React.FC<ChildProps> = ({ data }) => {
  return (
    <>
      {data?.map((result, i) => {
        return (
          <div key={i} className="list-results search-results">
            <div className="section-left">
              <Image
                src={
                  result.img != null && result.img != 'https://www.robinsonfresh.com'
                    ? result.img
                    : '/Doc.svg'
                }
                className="searchimg"
                alt={result.name}
              ></Image>
            </div>
            <div className="section-right">
              <h6>
                <Link href={result.url}>{result.name}</Link>
              </h6>
              <div>{result.description?.substring(0, 200)}</div>
              <div className="hr-line">{result.type ?? ''}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchComponent;
