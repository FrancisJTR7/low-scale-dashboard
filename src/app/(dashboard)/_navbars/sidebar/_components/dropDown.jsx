'use client';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompany } from '../../../../../state/companySlice';
import clsx from 'clsx';

const Dropdown = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const DarkMode = useSelector((state) => state.theme.darkMode);

  const [cachedData, setCachedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryClient.getQueryData('userData');
      if (data) {
        setCachedData(data);
        setLoading(false);

        // Get the initial selection and dispatch to store in Redux
        const portfolioId = data.userInfo.portfolio_id;
        if (portfolioId) {
          const portfolioCompanies = data.portfolioList.filter(
            (portfolio) => portfolio.portfolio_id === portfolioId
          );
          const companies = portfolioCompanies.flatMap((pc) => pc.companies);

          if (companies.length > 0) {
            const initialCompany = companies[0];
            dispatch(
              selectCompany({
                tableIdentifier: initialCompany.table_identifier,
                companyName: initialCompany.company_name,
                hdyhau: initialCompany.hdyhau, // Add hdyhau here
              })
            );
          }
        }
      }
    };

    fetchData();

    const interval = setInterval(() => {
      const data = queryClient.getQueryData('userData');
      if (data && !cachedData) {
        setCachedData(data);
        setLoading(false);
        clearInterval(interval);

        // Get the initial selection and dispatch to store in Redux
        const portfolioId = data.userInfo.portfolio_id;
        if (portfolioId) {
          const portfolioCompanies = data.portfolioList.filter(
            (portfolio) => portfolio.portfolio_id === portfolioId
          );
          const companies = portfolioCompanies.flatMap((pc) => pc.companies);

          if (companies.length > 0) {
            const initialCompany = companies[0];
            dispatch(
              selectCompany({
                tableIdentifier: initialCompany.table_identifier,
                companyName: initialCompany.company_name,
                hdyhau: initialCompany.hdyhau, // Add hdyhau here
              })
            );
          }
        }
      }
    }, 5); // Check every .05s for updated data

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [queryClient, dispatch, cachedData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const portfolioId = cachedData.userInfo.portfolio_id;

  if (!portfolioId) {
    return null; // If portfolio_id is null, do not render the dropdown
  }

  const portfolioCompanies = cachedData.portfolioList.filter(
    (portfolio) => portfolio.portfolio_id === portfolioId
  );

  const companies = portfolioCompanies.flatMap((pc) => pc.companies);

  const handleCompanyChange = (event) => {
    const selectedTableIdentifier = event.target.value;
    const selectedCompany = companies.find(
      (company) => company.table_identifier === selectedTableIdentifier
    );

    if (selectedCompany) {
      dispatch(
        selectCompany({
          tableIdentifier: selectedTableIdentifier,
          companyName: selectedCompany.company_name,
          hdyhau: selectedCompany.hdyhau,
        })
      );
    }
  };

  return (
    <div className='text-black mt-4 text-[15px]  '>
      <select
        className={clsx(
          'w-[16.5rem] rounded-md bg-stone p-2',
          DarkMode && 'bg-[#283454] text-white'
        )}
        onChange={handleCompanyChange}
      >
        {companies.map((company) => (
          <option key={company.id} value={company.table_identifier}>
            {company.company_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
