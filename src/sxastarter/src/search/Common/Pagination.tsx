import React, { useState } from 'react';

import Image from 'next/image';

interface ChildProps {
  totalCount: number;
  onDataFromPagination: (selectedValue: number) => void;
  onDataFromPageClick: (offset: number) => void;
}
const Pagination: React.FC<ChildProps> = ({
  totalCount,
  onDataFromPagination,
  onDataFromPageClick,
}) => {
  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const [buttonStyle, setbuttonStyle] = useState<boolean[]>([true, true, false]);
  const [selectedValue, setSelectedValue] = useState('10');
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onDataFromPagination(Number(event.target.value));
  };
  const recordPerPage = Number(selectedValue);
  const totalRecords: number = totalCount;
  const totalPages: number = totalRecords / recordPerPage;

  const handleClick = (currentPage: number) => {
    const updatedStyle: boolean[] = [false, false, false];
    updatedStyle[currentPage] = true;
    setbuttonStyle(updatedStyle);

    onDataFromPageClick(currentPage);
  };
  return (
    <div className="pagination">
      <div className="resultPerPage">
        <label>Results per Page</label>
        <select value={selectedValue} onChange={handleDropdownChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="totalPages">
        <Image src="/left.svg" alt="Prev" height={20} width={20}></Image>

        {Array.from({ length: totalPages }, (_, index) => {
          const itemCount = index + 1;
          return (
            <>
              {itemCount <= 5 || itemCount > totalPages - 1 ? (
                <button
                  key={itemCount}
                  onClick={() => handleClick(itemCount)}
                  style={{ backgroundColor: buttonStyle[itemCount] ? '#aaa' : '#f3f3f3' }}
                >
                  {itemCount}
                </button>
              ) : (
                ''
              )}
            </>
          );
        })}

        <a onClick={() => handleClick(2)}>
          {' '}
          <Image src="/right.svg" alt="Next" height={20} width={20}></Image>
        </a>
      </div>
    </div>
  );
};

export default Pagination;
