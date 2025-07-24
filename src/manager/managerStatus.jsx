
import React, {useEffect, useState} from 'react';
import ReChart from './rechart';
const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

export default function ManagerStatus({}){
    var x;

    const changeURL = (code) => {
        x=backendUrl + "/users/status/"+ code
    }
    const renderSection = () => {
        return (
            <div>


            <div className="pt-20">
            {changeURL(1)}
                <ReChart title="نمودار وضعیت شهرستان ها از منظر تعداد بازدید" apiUrl={x}/>
            </div>
            <div className="pt-20">
            {changeURL(2)}
            <ReChart title="نمودار وضعیت شهرستان ها از منظر شرکت در جشنواره ها" apiUrl={x}/>
            </div>
            </div>
        );

    }
    return(
   <>
        <div style={{ width: '100%' , minHeight: '400px' }}>

<main className="flex flex-col gap-4 p-6">
         
{renderSection()}</main>

        </div>



   </>
    )
}