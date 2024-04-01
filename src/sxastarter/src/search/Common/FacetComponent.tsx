'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Filter, SitecoreResponseFacets, TypeItem } from '../Interfaces/SitecoreResponseContent';


interface ChildProps {
  facets: SitecoreResponseFacets[];
  onDataFromFacets: (filterPayload: TypeItem[]) => void;
}

const FacetComponent: React.FC<ChildProps> = ({ facets, onDataFromFacets }) => {
  const [filterPayload, setFilterPayload] = useState<TypeItem[]>([])
  const [selectedFacets, setSelectedFacets] = useState<string[]>([])
  const [divVisibilities, setDivVisibilities] = useState<string[]>([]);
  const toggleDivVisibility = (facetlabel: string) => {
    const updatedVisibilities = [...divVisibilities];
    if (updatedVisibilities.includes(facetlabel)) {
      updatedVisibilities.splice(updatedVisibilities.indexOf(facetlabel), 1)
    }
    else {
      updatedVisibilities.push(facetlabel)
    }
    setDivVisibilities(updatedVisibilities)
  };
  useEffect(() => {
    onDataFromFacets(filterPayload);
  }, [filterPayload]);

  const setCheckBoxSelectedValue = (facetid: string) => {
    const updatedFacets = [...selectedFacets];
    if (updatedFacets.includes(facetid)) {
      updatedFacets.splice(updatedFacets.indexOf(facetid), 1)
    }
    else {
      updatedFacets.push(facetid)
    }
    setSelectedFacets(updatedFacets)
  }
  const handleCheckboxChange = (facetid: string, facetname: string) => {
    setCheckBoxSelectedValue(facetid);
    const filter = {} as Filter;
    filter.type = "or"
    filter.values = [facetid]
    const typeItem = {} as TypeItem
    typeItem.name = facetname
    typeItem.filter = filter
    let mainItem = [...filterPayload].find((item) => item.name === facetname)
    if (mainItem != null) {
      const facetItem = mainItem?.filter.values.find(f => f === facetid)
      if (!facetItem) {
        const itemsCollection: TypeItem[] = [...filterPayload]
        itemsCollection.find(item => item.name == facetname)?.filter.values.push(facetid)
        setFilterPayload(itemsCollection)
      }
      else {
        if (mainItem?.filter.values.length != 1) {
          const itemsCollection: TypeItem[] = [...filterPayload]
          const valueCollection = mainItem.filter.values;
          valueCollection.splice(valueCollection.findIndex(f => f === facetid), 1)
          itemsCollection.map(item => item.name === facetid ?
            { ...item, values: { ...item.filter.values, valueCollection } } : item)
          setFilterPayload(itemsCollection)
        }
        else {
          const itemsCollection: TypeItem[] = [...filterPayload]
          itemsCollection.splice(itemsCollection.findIndex(item => item.name === facetid), 1);
          setFilterPayload(itemsCollection)
        }
      }
    }
    else {
      setFilterPayload((prevFilterPayload) => [...prevFilterPayload, typeItem]);
    }
  }
  return (<>
    {
      facets?.map((facet, i) => {
        return <div className="facets" key={i}>
          <button type='button' onClick={() => toggleDivVisibility(facet.label)}>
            <span>{facet.label}</span>
            <Image src={"/arrow-down.svg"} alt={facet.name} height={20} width={20}></Image>
          </button>
          {(<div className='checkbox' style={{ display: (divVisibilities.includes(facet.label) ? 'block' : 'none') }}><ul>
            {
              facet.value?.map((value, j) => {
                return <li key={j}>
                  <label>
                    <input id={value.id}
                      type="checkbox"
                      checked={selectedFacets.includes(value.id)}
                      onClick={() => handleCheckboxChange(value.id, facet.name)}
                    />
                    <span>{value.text} ({value.count})</span>
                  </label>
                </li>
              })
            }
          </ul></div>
          )}

        </div>
      })
    }
  </>

  )
}

export default FacetComponent