import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import apiService from '../Services/apiService'; // Adjust the path as necessary
import './UserLicense.css'; // Import your CSS file for styling

const UserLicense = () => {
  const [userLicense, setUserLicense] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const API_URL = '/userLicense'; // Relative URL for the API endpoint

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const data = await apiService.get(API_URL);
        console.log('Fetched data:', data); // Log fetched data
        setTimeout(() => {
          setUserLicense(data);
          setLoading(false); // Set loading to false after data is fetched and delay
        }, 2000); // 2-second delay
      } catch (error) {
        console.error('Error fetching user License:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserSubscriptions();
  }, []);

  const isExpired = (endDate) => {
    const today = new Date();
    return new Date(endDate) < today;
  };

  const data = useMemo(() => userLicense, [userLicense]);

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search...`}
      />
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'select',
        disableSortBy: true,
        disableFilters: true,
        Cell: ({ row }) => <input type="checkbox" />,
      },
      {
        Header: 'User License ID',
        accessor: 'userLicenseId',
        Filter: DefaultColumnFilter,
        Cell: ({ value }) => (
          <div className="tooltip">
            {value}
            <span className="tooltiptext">User License ID: {value}</span>
          </div>
        ),
      },
      { Header: 'User ID', accessor: 'userTable.userId', Filter: DefaultColumnFilter },
      { Header: 'Username', accessor: 'userTable.username', Filter: DefaultColumnFilter },
      { Header: 'Application ID', accessor: 'application.appId', Filter: DefaultColumnFilter },
      { Header: 'Application Name', accessor: 'application.appName', Filter: DefaultColumnFilter },
      {
        Header: 'Subscription ID',
        accessor: 'application.subscriptionPlan.subscriptionId',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Subscription Plan',
        accessor: 'application.subscriptionPlan.name',
        Filter: DefaultColumnFilter,
      },
      { Header: 'License Key ID', accessor: 'licenseKey.licenseId', Filter: DefaultColumnFilter },
      {
        Header: 'Key Value', accessor: 'licenseKey.keyValue', Filter: DefaultColumnFilter,


        Cell: ({ value, row }) => (
          <span className={isExpired(row.original.licenseKey.expirationDate) ? 'expired-end-date' : 'date-cell'}>
            {value}
          </span>
        ),
      },
      {
        Header: 'License Expiration Date',
        accessor: 'licenseKey.expirationDate',
        Filter: DefaultColumnFilter,
        Cell: ({ value, row }) => (
          <span className={isExpired(row.original.licenseKey.expirationDate) ? 'expired-end-date' : 'date-cell'}>
            {value}
          </span>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    setFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Adjust the initial page size if needed
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const renderSkeleton = () => {
    const rows = [];
    for (let i = 0; i < pageSize; i++) {
      rows.push(
        <tr key={i} className="skeleton-row">
          {columns.map((column, index) => (
            <td key={index} className="skeleton-cell">
              <Skeleton height={20} />
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="user-subscription-container">
      <h2 style={{ color: "rgb(52, 71, 103)" }}>User License</h2>
      <div className="table-container">
        <table className="user-subscription-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                    {/* Add a basic filter UI */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              renderSkeleton()
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(userLicense.length / pageSize)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLicense;
