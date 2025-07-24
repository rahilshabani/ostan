
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import  {BarChart, Cell, Bar, XAxis, YAxis, CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';

export default function CityBarChart({title,county,apiUrl,highlightColor='#ff4d4d',defaultColor = '#8884d8'}){
    const [data,setData]=useState([]);
    useEffect(()=>{
        
        axios.get(apiUrl)
        .then(response=>{
            console.log(response.data)
            setData(response.data)
            // setData([
            //     {"name":"ghaemshahr","value":100},
            //     {"name":"sari1","value":120},
            //     {"name":"sari2","value":200},
            // ])
    })
        .catch(error=>console.error(error));
    },[apiUrl]);

    const coloredData = data.map(item => 
    ({
        ...item,
        fill: item.name === county ? highlightColor : defaultColor
    })
    );

    return(
        <div style={{ width: '100%' , height: '400px'}}>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <ResponsiveContainer>
                <BarChart data={coloredData} margin={{top:20,right:30,left:20,bottom:5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={defaultColor} >
                    {
                        coloredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))
                    }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}