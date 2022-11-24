import Link from 'next/link';
import { useState, useEffect } from 'react';

const MintSuccess = ({nftInfo}) => {

    useEffect(() => {
        console.log(nftInfo);
    }, [nftInfo])

    return(
        <div>
            <Link href="/" style={{float: 'right'}} legacyBehavior>
                <a className="text-1xl font-bold float-right mr-[50px]">
                    BACK
                </a>
          </Link>
           <div className="flex justify-center items-center h-screen w-full">
                <div className="bg-white shadow-md mt-[-100px] h-[400px] w-[700px] rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row">
                    <img className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
                        src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
                        alt="image"
                    />

                    <div className="flex-1 w-full flex flex-col items-baseline mt-10 pl-6 h-full">
                        <div className="flex flex-col justify-start items-baseline">
                            <span class="text-xs text-black-300 mt-4">ID</span>
                            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                {nftInfo?.metadata?.id}
                            </h1>
                            <span class="text-xs text-black-300 mt-4">NAME</span>
                            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                {nftInfo?.metadata?.name}
                            </h1>
                            <span class="text-xs text-black-300 mt-4">DESCRIPTION</span>
                            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                {nftInfo?.metadata?.description}
                            </h1>
                            <span class="text-xs text-black-300 mt-4">OWNER</span>
                            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                {nftInfo?.owner}
                            </h1>
                        </div>
                    </div>
                </div>
                
            </div>

            
        </div>
    )
};

export default MintSuccess;