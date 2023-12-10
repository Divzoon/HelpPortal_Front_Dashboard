import React, { FC } from 'react';
import Progressbar from './ProgressBar/Progressbar';

interface CompanyCardStatsProps {
  companyName: string;
  documentations: number | null;
  blogs: number | null;
  quotaProgress: number;
}

const CompanyCardStats: FC<CompanyCardStatsProps> = ({ companyName, documentations, blogs, quotaProgress }) => {
  return (
    <>
      <div className="h-full w-full rounded-3xl relative p-2 grid place-items-center">
        <div className="relative w-[90%] h-[70%] dark:bg-boxdark-2 text-gray-2 bg-meta-4 dark:text-bodydark rounded-3xl shadow-5">
          <div className="flex justify-center relative">
            <div className="bg-meta-1 dark:border-boxdark-2 dark:text-bodydark dark:border-6 border-4 border-meta-4 -mt-5 rounded-full h-20 w-20 grid place-items-center">
              {/* Display your logo or logo-related content here */}
              logo
            </div>
            <div className="pt-2 gap-2 text-gray font-bold overflow-hidden overflow-ellipsis max-w-[200px]">
                {companyName && companyName.length > 20 ?  companyName:`${companyName.slice(0, 20)}..` }
            </div>
            </div>
            <div className="font-semibold mx-2 h-[100px]">
                <div className='flex gap-1 justify-start'>Documentations: 
                    <span className='text-gray  grid place-items-center text-sm overflow-hidden overflow-ellipsis max-w-[200px]'>

{    documentations && documentations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('').reverse().join('').slice(0, 7).split('').reverse().join('') + '..' 
}

  
    </span>
                </div>
                <div className='flex justify-start gap-1'>Blogs: 
                    <span className='text-gray overflow-hidden overflow-ellipsis max-w-[200px]'>
                    {    blogs && blogs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('').reverse().join('').slice(0, 9).split('').reverse().join('') + '..'}
                    </span>
                </div>
            <div className="py-2">
              <div className="py-2 overflow-hidden ">
                <h1>Quota</h1>
              </div>
            <Progressbar progressBarWidth={quotaProgress > 100 ? 100 : quotaProgress} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCardStats;
