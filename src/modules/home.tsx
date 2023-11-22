import React, { useEffect, useState } from 'react'
import styles from "./home.module.scss"
import { fetchWeatherApi } from 'openmeteo';
import {
    Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Pie, Line, Doughnut, Bar } from 'react-chartjs-2';
import LeftSidebar from './leftSidebar/leftsidebar';
import axios from 'axios';
import weather from "../styles/images/weather.png"
import crypto from "../styles/images/crypto.png"
ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend);
export default function HomePage() {

    const [temperature, setTemperature] = useState<any>([]);
    const [weatherTime, setWeatherTime] = useState<any>([]);
    const [isActive, setActive] = useState(false);
    const [currencyPrice, setCurrencyPrice] = useState<any>([]);
    const [currencyId, setCurrencyId] = useState<any>([]);
    const [currencyFilterPrice, setCurrencyFilterPrice] = useState<any>([]);
    const [currencyFilterId, setCurrencyFilterId] = useState<any>([]);
    const [latitude, setLatitude] = useState<any>(13.008430);
    const [longitude, setLongitude] = useState<any>(80.207169);
    const [cities, setCities] = useState<any>([]);
    const toggleClass = () => {
        setActive(!isActive);
    };

    const url = "https://api.open-meteo.com/v1/forecast";


    useEffect(() => {
        const params = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": ["temperature_2m"],
            "timezone": "Asia/Singapore"
        };

        fetchWeatherApi(url, params).then((res: any) => {
            const firstSixValues = res[0].bb.bytes_.slice(0, 10);
            setTemperature(firstSixValues)
            const range = (start: number, stop: number, step: number) =>
                Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
            const response = res[0];
            const utcOffsetSeconds = response.utcOffsetSeconds();
            const hourly = response.hourly()!;
            const weatherData = {
                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    temperature2m: hourly.variables(0)!.valuesArray()!,
                },

            };
            let weatherTime: any = [];
            let weatherTemperature: any = [];
            for (let i = 0; i < weatherData.hourly.time.length; i++) {
                const [datePart, timePart] = weatherData.hourly.time[i].toISOString().split('T');
                const timeOnly = timePart.substring(0, 8);
                const hour = timeOnly.substring(0, 2);
                weatherTime.push(hour);
                weatherTemperature.push(weatherData.hourly.temperature2m[i]);
            }
            setTemperature(weatherTemperature)
            setWeatherTime(weatherTime)
        })


    }, [latitude, longitude])






    useEffect(() => {
        axios.get('https://fcsapi.com/api-v3/forex/latest?id=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30&access_key=MPvQPZMuHGTAO3TbfCYNobQ').then((res: any) => {
            let currencyArr: any = [];
            let currencyId: any = [];
            res?.data?.response?.map((list: any) => {
                currencyArr.push(list?.c);
                currencyId.push(list?.s)
            })
            setCurrencyPrice(currencyArr?.slice(0, 5));
            setCurrencyFilterPrice(currencyArr);
            setCurrencyFilterId(currencyId)
            setCurrencyId(currencyId?.slice(0, 5))
        })

        axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json').then((response: any) => {
            const citiesName = response?.data.slice(0, 100)
            setCities(citiesName)
        })

    }, [])

    const data = {
        labels: weatherTime.slice(0, 6),
        datasets: [
            {
                label: 'Weather',
                data: temperature.slice(0, 6),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    const currencyData = {
        labels: currencyId,
        datasets: [
            {
                label: 'Currency',
                data: currencyPrice,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };




    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };
    
    const filterCities = (e: any)=>{
           cities?.map((list: any)=>{
            if(list?.name === e.target.value){
                setLatitude(list?.latitude);
                setLongitude(list?.longitude)
            }
           })  
    }

       
    const FilterTime = (e: any)=>{
       if(e.target.value === 'Today') {
        setCurrencyPrice(currencyFilterPrice?.slice(6, 11));
        setCurrencyId(currencyFilterId?.slice(6, 11))
       } else if(e.target.value === 'Yesterday'){
        setCurrencyPrice(currencyFilterPrice?.slice(12, 17));
        setCurrencyId(currencyFilterId?.slice(12, 17))
       } else if(e.target.value === 'Last 7 days'){
        setCurrencyPrice(currencyFilterPrice?.slice(18, 24));
        setCurrencyId(currencyFilterId?.slice(18, 24))
       }
 }


    return (
        <div className={styles.homePage}>
            <div className={isActive ? `${styles.humburger} ${styles.opened} ` : styles.humburger} onClick={toggleClass}>
                <span className={isActive ? "hamburger-icon open" : "hamburger-icon"}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
            <div className={isActive ? `${styles.leftSidebar} ${styles.active}` : styles.leftSidebar} >
                <LeftSidebar />
            </div>
            <div className={styles.rightSide}>
                <div className={`${styles.scroller} ${styles.whiteBox}`}>
                    <h4 className={styles.pageTitle}>Overview</h4>
                    <div className={styles.chartRow}>
                        <div className={styles.chartBox}>
                            <span className={styles.leftText}>Temprature</span>
                            <p className={styles.chartTitle}>Weather chart <span><img src={weather} alt="" /></span></p>
                            <div className={styles.formRow}>
                                <label className={styles.label}>Search city</label>
                                <select onChange={filterCities}>
                                    {cities?.map((list: any)=>{
                                       return  <option>{list?.name}</option>
                                    })
                                    }
                                </select>
                            </div>
                            <Bar data={data} />
                            <span className={styles.bottomText}>Time</span>
                        </div>
                        <div className={styles.chartBox}>
                            <span className={styles.leftText}>Price</span>
                            <p className={styles.chartTitle}>Crypto pricing <span><img src={crypto} alt="" /></span></p>
                            <div className={styles.formRow}>
                                <label>Filter</label>
                                <select  placeholder='' onChange={FilterTime}>
                                    <option>Today</option>
                                    <option>Yesterday</option>
                                    <option>Last 7 days</option>
                                </select>
                            </div>
                            <Line options={options} data={currencyData} />
                            <span className={styles.bottomText}>Symbol</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
