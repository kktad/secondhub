import React, { useEffect, useState } from 'react';
import { MyValue, SitecoreResponseSort } from '../Interfaces/SitecoreResponseContent';
interface ChildProps {
  sort: SitecoreResponseSort[];
  onDataFromSort: (sort: MyValue[]) => void;
}

const Sorting: React.FC<ChildProps> = ({ sort, onDataFromSort }) => {
  const [selectedSortValue, setSelectedSortValue] = useState('');
  const [sortPayload, setSortPayload] = useState<MyValue[]>([]);

  const setDropDownSelectedValue = (sortValue: string) => {
    const name = {} as MyValue;
    name.name = sortValue;
    setSortPayload([name]);
  };
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDropDownSelectedValue(event.target.value);
    // console.log(JSON.stringify(sortPayload));
    setSelectedSortValue(event.target.value);
  };
  useEffect(() => {
    onDataFromSort(sortPayload);
  }, [selectedSortValue, sortPayload]);
  return (
    <div>
      <select value={selectedSortValue} onChange={handleDropdownChange}>
        {sort.map((option) => (
          <option key={option.name} value={option.name}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
