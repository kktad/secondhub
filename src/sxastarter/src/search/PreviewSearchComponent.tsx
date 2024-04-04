'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RequestPayload } from './payloads/RequestPayload';
import {
  SitecoreResponseContent,
  SitecoreResponseSuggestions,
} from './Interfaces/SitecoreResponseContent';
import Link from 'next/link';
import Image from 'next/image';
import { eventTrackAPI, discoverAPI } from './Api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const PreviewSearchComponent = () => {
  const router = useRouter();
  const [data, setData] = useState<SitecoreResponseContent[]>();
  const [suggestions, setSuggestions] = useState<SitecoreResponseSuggestions[]>();
  const [noresult, setNoResults] = useState('');
  const [isInsideClick, setInsideClick] = useState(false);
  const [keyword, setKeyword] = useState('');
  const searchParams = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);
  const myuuid = uuidv4();
  useEffect(() => {
    const search: any = searchParams.get('q');
    setKeyword(search);
  }, []);
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setInsideClick(false);
      }
    };
    window.addEventListener('mousedown', handleOutSideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [ref]);

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      await setEventTrackAPIData('click');
      router.push('/search?q=' + event.target.value);
    }
  };

  const getSitecoreContent = async (searchText: any) => {
    const limit: any = Number(process.env.NEXT_PUBLIC_PREVIEW_RECORD_LIMITS);
    const payload = RequestPayload();
    payload.widget.items[0].search.limit = limit;
    payload.widget.items[0].rfk_id = 'rfkid_6';
    if (searchText != '') {
      payload.widget.items[0].search.query.keyphrase = searchText;
    }
    const response = await discoverAPI(payload);
    setInsideClick(true);
    const contentResponse: SitecoreResponseContent[] =
      response.content != undefined ? response.content : [];
    setData(contentResponse);
    const notFound = response.content == undefined ? 'No Result Found' : '';
    setNoResults(notFound);
    return response;
  };
  const setEventTrackAPIData = async (action: any) => {
    await eventTrackAPI(window.location.href, myuuid, 'kirty.s@tadigital.com', '1914', 'F', action);
  };
  const handleChange = async (e: any) => {
    const searchText = e.target.value;
    setKeyword(searchText);
    const response = await getSitecoreContent(searchText);
    const suggesionResponse: SitecoreResponseSuggestions[] =
      response.suggestion != undefined ? response.suggestion.title_context_aware : [];
    setSuggestions(suggesionResponse);
  };
  const handleMouseHover = async (suggestion?: string) => {
    if (suggestion != '') {
      await getSitecoreContent(suggestion);
      await setEventTrackAPIData('view');
    }
  };
  return (
    <div className="previewContainer" ref={ref}>
      <input
        className="input-field"
        type="search"
        value={keyword ?? ''}
        onClick={handleChange}
        placeholder="Type to Search..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {isInsideClick && (
        <div className="popup">
          <div className="suggestions">
            <h4>Suggestions</h4>
            <ul>
              {suggestions?.map((suggesion, i) => {
                return (
                  <>
                    <Link href={{ pathname: '/searchresults', query: { q: suggesion.text } }}>
                      <li key={i} onMouseEnter={() => handleMouseHover(suggesion.text)}>
                        {suggesion.text}
                      </li>
                    </Link>
                  </>
                );
              })}
            </ul>
          </div>
          <ul className="content">
            {data?.map((result, i) => {
              return (
                <li key={i}>
                  <Link href={result.url}>
                    <div>
                      <Image
                        src={
                          result.img != null && result.img != 'https://www.robinsonfresh.com'
                            ? result.img
                            : '/Doc.svg'
                        }
                        alt={result.name}
                        height={120}
                        width={120}
                      ></Image>
                    </div>
                    <h6>{result.name.substring(0, 80)}</h6>
                  </Link>
                </li>
              );
            })}
            <div>{noresult}</div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PreviewSearchComponent;
