import Link from 'next/link';

const YourComponent: React.FC = ({ totalPages }) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link key={index + 1} href={`/page/${index + 1}`}>
          {/* <a style={{ margin: '0 5px', fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}>
              {index + 1}
            </a> */}
        </Link>
      ))}
    </div>
  );
};
export default YourComponent;
